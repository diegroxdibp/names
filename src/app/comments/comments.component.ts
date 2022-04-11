import { CommentsService } from './../services/comments.service';
import { Component } from '@angular/core';
import { IComment } from '../models/comment.model';
import { OnlineOfflineService } from '../services/online-offline.service';
import { IndexedDbService } from '../services/indexed-db.service';
import { NAMES_API_URL } from '../api.endpoints';
import { ImagePreview } from '../models/image-preview.model';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  comments: IComment[] = [];
  imagesPreview: ImagePreview[] = [];
  files: Set<File> = new Set();
  encodedFiles: Set<string | ArrayBuffer | null> = new Set();
  server_endpoint: string;
  constructor(
    public commentsService: CommentsService,
    private onlineOfflineService: OnlineOfflineService,
    private indexedDBService: IndexedDbService
  ) {
    this.listenConectionStatus();
    this.getComments();
    this.server_endpoint = NAMES_API_URL.replace('api/names/', '');
  }

  getComments() {
    this.commentsService.comments$.subscribe((comments: IComment[]) => {
      this.comments = comments;
    });
  }

  deleteComment(comment_id: number) {
    if (this.onlineOfflineService.isOnline) {
      this.commentsService.removeComment(comment_id!);
    } else {
      this.indexedDBService.storeDeleteToIndexedDB(comment_id);
    }
  }

  submitComment(author: string, comment: string): void {
    author = author || 'Anonymous';
    let payload: IComment = { author, comment, files: this.files };
    if (this.onlineOfflineService.isOnline) {
      this.commentsService.addComment(payload);
    } else {
      this.indexedDBService.storeCommentToIndexedDB(payload);
    }
  }

  onSelectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const selectedFiles = target.files as FileList;

    if (this.files.size > 0) {
      const BreakException = {};
      try {
        this.files.forEach((file: File) => {
          for (let i = 0; i < selectedFiles.length; i++) {
            console.log('Selected', selectedFiles[i], 'OnList', file);
            if (selectedFiles[i].name !== file.name) {
              this.files.add(selectedFiles[i]);
            } else {
              throw BreakException;
            }
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    } else {
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.add(selectedFiles[i]);
      }
    }
    target.value = '';
    this.convertFilesToBase64(this.files);
    this.previewImages();
  }

  listenConectionStatus(): void {
    this.onlineOfflineService.conectionStatus.subscribe((online) => {
      if (online) {
        console.log(`ONLINE // Sending cached data`);
        this.indexedDBService.sendFromIndexedDBToAPI();
      } else {
        console.log(`OFFLINE - Lost connection`);
      }
    });
  }

  previewImages(): void {
    const imagesPreview: ImagePreview[] = [];
    this.files.forEach((file: File) => {
      imagesPreview.push({
        name: file.name,
        url: window.URL.createObjectURL(file),
      });
    });
    this.imagesPreview = imagesPreview;
  }

  removeFile(imageToBeRemoved: ImagePreview) {
    this.files.forEach((file: File) => {
      if (file.name === imageToBeRemoved.name) this.files.delete(file);
    });
    this.previewImages();
  }

  async convertFilesToBase64(files: Set<File>) {
    files.forEach(async (file: File) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.encodedFiles.add(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    });
    // setTimeout(() => {
    //   console.log('Enconded Files ->', this.encodedFiles);
    // }, 500);
  }

  getTooltipText(comment: HTMLTextAreaElement): string {
    if (!comment.value) {
      return `Please write a comment before submiting.`;
    }
    return '';
  }

  public trackComment(index: number, item: IComment): number | undefined {
    return item.comment_id;
  }

  public trackPreveiw(
    index: number,
    item: ImagePreview
  ): ImagePreview | undefined {
    return item;
  }
}
