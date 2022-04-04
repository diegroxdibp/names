import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  private connectionStatus$ = new Subject<boolean>();
  constructor() {
    window.addEventListener('online', () => this.updateConectionStatus());
    window.addEventListener('offline', () => this.updateConectionStatus());
  }

  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get conectionStatus(): Observable<boolean> {
    return this.connectionStatus$.asObservable();
  }

  updateConectionStatus(): void {
    this.connectionStatus$.next(this.isOnline);
  }
}
