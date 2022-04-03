import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NAMES_API_URL } from '../api.endpoints';
import { IComment } from '../models/comment.model';
@Injectable({
  providedIn: 'root',
})
export class JapNamesService {
  allFirstnames$: Observable<IComment[]>;
  constructor(private http: HttpClient) {
    this.allFirstnames$ = this.getAllFirstnames();
  }

  getRandomName(): string {
    return 'Fujiro Nakombi';
  }

  getRandomFirstname() {
    return this.http.get(NAMES_API_URL + 'jap/firstname');
  }

  getRandomLastname() {
    return this.http.get(NAMES_API_URL + 'jap/lastname');
  }

  addFirstname(firstname: string) {
    return this.http.post(NAMES_API_URL + 'jap/firstname/add', {
      firstname,
    });
  }

  addLastname(lastname: string) {
    return this.http.post(NAMES_API_URL + 'jap/firstname/add', {
      lastname,
    });
  }

  getAllFirstnames(): Observable<IComment[]> {
    return this.http.get<IComment[]>(NAMES_API_URL + 'jap/firstname/all');
  }
}
