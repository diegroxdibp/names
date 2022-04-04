import { CommentsService } from './../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IComment } from '../models/comment.model';
import { OnlineOfflineService } from '../services/online-offline.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: IComment[] = [];
  constructor(
    public commentsService: CommentsService,
    private onlineOfflineService: OnlineOfflineService
  ) {
    this.listenConectionStatus();
    this.getComments();
  }

  ngOnInit(): void {}

  getComments() {
    this.commentsService.comments$.subscribe((comments: IComment[]) => {
      this.comments = Object.assign(comments);
    });
  }

  public trackItem(index: number, item: IComment) {
    return item.comment_id;
  }

  submit(author: string, comment: string): void {
    const payload: IComment = { author, comment };
    if (this.onlineOfflineService.isOnline) {
      this.commentsService.addComment(payload);
    } else {
      console.log(`HOLD!`);
    }
  }

  listenConectionStatus() {
    this.onlineOfflineService.conectionStatus.subscribe((online) => {
      if (online) {
        console.log(`ONLINE // Sending cached data`);
      } else {
        console.log(`OFFLINE`);
      }
    });
  }
}
