import { Component, OnInit } from '@angular/core';
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

  getFirstname() {
    this.japNamesService.getRandomFirstname().subscribe((data: any) => {
      this.firstname = data.firstname;
      console.log(`Firstname`, data.firstname);
    });
  }

  getLastname() {
    this.japNamesService.getRandomLastname().subscribe((data: any) => {
      this.lastname = data.lastname;
      console.log(`Lastname`, data.lastname);
    });
  }

  getFullname() {
    this.japNamesService.getRandomFirstname().subscribe((data: any) => {
      this.firstname = data.firstname;
      console.log(`Firstname`, data.firstname);
    });
    this.japNamesService.getRandomLastname().subscribe((data: any) => {
      this.lastname = data.lastname;
      console.log(`Lastname`, data.lastname);
    });
    console.log(this.firstname, this.lastname);
  }

  addFirstname(firstname: string) {
    this.japNamesService.addFirstname(firstname);
  }

  addLastname(lastname: string) {
    this.japNamesService.addLastname(lastname);
  }

  submit(firstname: any, lastname: any) {
    console.log(
      'First name: ',
      firstname.value,
      '-- Last name:',
      lastname.value
    );
  }
}
