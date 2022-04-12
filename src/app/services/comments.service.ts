import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NAMES_API_URL } from '../api.endpoints';
import { IComment } from '../models/comment.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { buildFormData } from '../utils/build-form-data.util';
import { map } from 'rxjs/internal/operators/map';
import { parseArrayAsText } from '../utils/parse-text-array.util';
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
      .get<IComment[]>(NAMES_API_URL + 'api/names/jap/comments/all')
      // .pipe(
      //   map((comments: IComment[]) => {
      //     if (typeof comments[0]?.images_url === 'string') {
      //       return comments.map((comment: any) => {
      //         comment.images_url = parseArrayAsText(comment.images_url);
      //         console.log(comment.images_url);
      //         return comment;
      //       });
      //     } else {
      //       return comments;
      //     }
      //   })
      // )
      .subscribe((data) => {
        console.log(data);
        this.comments$.next(data);
      });
  }

  addComment(comment: IComment): void {
    let payload: IComment | FormData = comment;
    if (comment.files) {
      payload = buildFormData(comment);
    }
    this.http
      .post(NAMES_API_URL + 'api/names/jap/comments/add', payload)
      .subscribe(() => this.getAllComments());
  }

  removeComment(comment_id: number): void {
    this.http
      .delete(NAMES_API_URL + `api/names/jap/comments/remove/${comment_id}`)
      .subscribe(() => this.getAllComments());
  }
}
