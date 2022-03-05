import { Component, OnInit } from '@angular/core';
import {InternshipsService} from '../../services/internships.service';


@Component({
  selector: 'app-sent-internships-to-institutions',
  templateUrl: './sent-internships-to-institutions.component.html',
  styleUrls: ['./sent-internships-to-institutions.component.scss']
})
export class SentInternshipsToInstitutionsComponent implements OnInit {

  public Internships = [];
  id?: string;
  internship: any;
  username: any;
  search: any;
  data: any;
  internships: string[] = [];
  showAlert?: boolean;
  title?: string;

  constructor(public internshipsService: InternshipsService) { }

  ngOnInit(): void {

    this.institutionSentInternships();
  }

  institutionSentInternships(){

    this.internshipsService.getAllSendInternship()
    .subscribe((result:any) => {
      // this.Users.push(result);
      result.data.forEach((val: any) => this.internships.push(val));
    });
  }

}
