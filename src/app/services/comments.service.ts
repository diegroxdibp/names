import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAMES_API_URL } from '../api.endpoints';
import { IComment } from '../models/comment.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { buildFormData } from '../utils/build-form-data.util';
@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments$: BehaviorSubject<IComment[]> = new BehaviorSubject<IComment[]>([]);
  constructor(private http: HttpClient) {
    this.getAllComments();
  }

  getAllComments(): void {
    this.http
      .get<IComment[]>(NAMES_API_URL + 'jap/comments/all')
      .subscribe((data) => {
        this.comments$.next(data);
      });
  }

  addComment(comment: IComment): void {
    let payload: IComment | FormData = comment;
    if (comment.files) {
      payload = buildFormData(comment);
    }
    this.http
      .post(NAMES_API_URL + 'jap/comments/add', payload)
      .subscribe(() => this.getAllComments());
  }

  removeComment(comment_id: number): void {
    this.http
      .delete(NAMES_API_URL + `jap/comments/remove/${comment_id}`)
      .subscribe(() => this.getAllComments());
  }
}
