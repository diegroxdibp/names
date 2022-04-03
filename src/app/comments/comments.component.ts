import { CommentsService } from './../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IComment } from '../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: IComment[] = [];
  constructor(public commentsService: CommentsService) {}

  ngOnInit(): void {
    this.getComments();
  }

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
    this.commentsService.addComment(payload);
  }
}
