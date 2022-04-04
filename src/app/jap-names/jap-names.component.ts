import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { IFirstname } from '../models/firstname.model';
import { ILastname } from '../models/lastname.model';
import { JapNamesService } from '../services/jap-names.service';

@Component({
  selector: 'app-jap-names',
  templateUrl: './jap-names.component.html',
  styleUrls: ['./jap-names.component.scss'],
})
export class JapNamesComponent implements OnInit {
  firstname: string = '';
  lastname: string = '';
  constructor(public japNamesService: JapNamesService) {}

  ngOnInit(): void {}

  getFirstnamePWA() {
    this.japNamesService.allFirstnames$
      .pipe(
        tap((firstnames: IFirstname[]) => {
          this.firstname =
            firstnames[Math.floor(Math.random() * firstnames.length)].firstname;
        })
      )
      .subscribe();
  }

  getLastnamePWA() {
    this.japNamesService.allLastnames$
      .pipe(
        tap((lastnames: ILastname[]) => {
          this.lastname =
            lastnames[Math.floor(Math.random() * lastnames.length)].lastname;
        })
      )
      .subscribe();
  }

  getFullnamePWA() {
    this.getFirstnamePWA();
    this.getLastnamePWA();
    // console.log(this.firstname, this.lastname);
  }

  // getFirstnamePWA() {
  //   this.japNamesService.randomFirstName$
  //     .pipe(tap((data) => (this.firstname = data.firstname)))
  //     .subscribe();
  // }

  // getLastnamePWA() {
  //   this.japNamesService.randomLastName$
  //     .pipe(tap((data) => (this.lastname = data.lastname)))
  //     .subscribe();
  // }

  addFirstname(firstname: string) {
    this.japNamesService.addFirstname(firstname);
  }

  addLastname(lastname: string) {
    this.japNamesService.addLastname(lastname);
  }
}
