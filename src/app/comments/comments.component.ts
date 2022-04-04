import { CommentsService } from './../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IComment } from '../models/comment.model';
import { OnlineOfflineService } from '../services/online-offline.service';
import Dexie from 'dexie';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: IComment[] = [];
  private db: Dexie;
  private table: Dexie.Table<IComment, any>;
  constructor(
    public commentsService: CommentsService,
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.listenConectionStatus();
    this.getComments();
    this.db = new Dexie('db-comments');
    this.db.version(1).stores({
      comments: '++comment_id',
    });
    this.table = this.db.table('comments');
  }

  ngOnInit(): void {}

  getComments() {
    this.commentsService.comments$.subscribe((comments: IComment[]) => {
      this.comments = Object.assign(comments);
    });
  }

  async saveToIndexedDB(payload: IComment): Promise<void> {
    try {
      await this.table.add(payload);
      console.log('Comment added to IndexdDB');
    } catch (error) {
      console.log('Error while adding to Indexed DB ', error);
    }
  }

  async sendFromIndexedDBToAPI() {
    const indexedComments: IComment[] = await this.table.toArray();
    indexedComments.forEach(async (comment: IComment, index: number) => {
      this.commentsService.addComment(comment);
      await this.table.delete(++index);
    });
  }

  submit(author: string, comment: string): void {
    const payload: IComment = { author, comment };
    if (this.onlineOfflineService.isOnline) {
      this.commentsService.addComment(payload);
    } else {
      this.saveToIndexedDB(payload);
    }
  }

  listenConectionStatus() {
    this.onlineOfflineService.conectionStatus.subscribe((online) => {
      if (online) {
        console.log(`ONLINE // Sending cached data`);
        this.sendFromIndexedDBToAPI();
      } else {
        console.log(`OFFLINE - Lost connection`);
      }
    });
  }

  public trackItem(index: number, item: IComment) {
    return item.comment_id;
  }
}
