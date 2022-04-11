import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NAMES_API_URL } from '../api.endpoints';
import { IComment } from '../models/comment.model';
import { IFirstname } from '../models/firstname.model';
import { IFullname } from '../models/fullname.model';
import { ILastname } from '../models/lastname.model';
@Injectable({
  providedIn: 'root',
})
export class JapNamesService {
  allFirstnames$: Observable<IFirstname[]>;
  allLastnames$: Observable<ILastname[]>;
  allFullnames$: Observable<IFullname[]>;
  randomFirstName$: Observable<IFirstname>;
  randomLastName$: Observable<ILastname>;
  randomFullName$: Observable<IFullname>;
  constructor(private http: HttpClient) {
    this.allFirstnames$ = this.getAllFirstnames();
    this.allLastnames$ = this.getAllLastnames();
    this.allFullnames$ = this.getAllFullname();
    this.randomFirstName$ = this.getRandomFirstname();
    this.randomLastName$ = this.getRandomLastname();
    this.randomFullName$ = this.getRandomFullname();
  }

  getRandomFirstname(): Observable<IFirstname> {
    return this.http.get<IFirstname>(NAMES_API_URL + 'jap/firstname');
  }

  getRandomLastname(): Observable<ILastname> {
    return this.http.get<ILastname>(NAMES_API_URL + 'jap/lastname');
  }

  getRandomFullname(): Observable<IFullname> {
    return this.http.get<IFullname>(NAMES_API_URL + 'jap/fullname');
  }

  addFirstname(firstname: string): void {
    this.http
      .post(NAMES_API_URL + 'jap/firstname/add', {
        firstname,
      })
      .subscribe();
  }

  addLastname(lastname: string): void {
    this.http
      .post(NAMES_API_URL + 'jap/firstname/add', {
        lastname,
      })
      .subscribe();
  }

  getAllFirstnames(): Observable<IFirstname[]> {
    return this.http.get<IFirstname[]>(NAMES_API_URL + 'jap/firstname/all');
  }

  getAllLastnames(): Observable<ILastname[]> {
    return this.http.get<ILastname[]>(NAMES_API_URL + 'jap/lastname/all');
  }

  getAllFullname(): Observable<IFullname[]> {
    return this.http.get<IFullname[]>(NAMES_API_URL + 'jap/fullname/all');
  }
}
