import { Component, OnInit, Inject } from '@angular/core';
import { InternshipsService } from '../../services/internships.service';
import {UsersService} from '../../services/users.service';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import $ from 'jquery';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-available-internships',
  templateUrl: './available-internships.component.html',
  styleUrls: ['./available-internships.component.scss']
})
export class AvailableInternshipsComponent implements OnInit {

  institution_list = [
    { INSTITUIONNAME: 'International University of Management (IUM)', EMAILAD: 'eshivute@mtc.com.na' },
    { INSTITUIONNAME: 'Namibia University of Science and Technology (NUST)', EMAILAD: 'esthershivute@gmail.com' },
    { INSTITUIONNAME: 'Namibian  Institute  of  Mining  and  Technology (NIMT)', EMAILAD: '2esthershivute@gmail.com' },
    { INSTITUIONNAME: 'Vocational  Training  Centers(VTC) through the Namibia Training Authority (NTA)', EMAILAD: '3esthershivute@gmail.com' },
  ]


  internshipModal() {
    ($("#internshipModal")as any).modal('toggle');
  }

  public allpositions = [];
  public Users = [];
  id?: string;
  user: any;

  username: any;
  search: any;
  data: any;
  Internships: any[] = [];
  InternshipsName: any[] = [];
  showAlert?: boolean;
  number: any;

  submitted = false;
  closeModal?: string;

  loading = false;
  isSuccessful = false;
  showModal?: boolean;
  valid = false;
  
  emailaddress: any;
  email: any;
  no_of_internship: any;
  public iname: any;
  public  intern: any;

  file_name?: string;

  availableinternships: any;
  availableInternship: any;

  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  constructor(private internshipsService: InternshipsService, @Inject(DOCUMENT) private document: Document, public userService: UsersService, private route: Router) { }

  ngOnInit(): void {

    document.title = "Available internships: National Internship Program"

    //gettign the data from the localstroage
    this.data = JSON.parse(localStorage.getItem('INTERNSHIPdata')!)
    this.getAvailableInternships();
    this. getInternshipNames();
  }


  internshipNav(data: any){

    if (this.userService.isUserAuthenticatedrole()){


   const datatosave = {
      sendInternship: true,
      data
    }

    //saving data in the local storage
    localStorage.setItem('INTERNSHIPdata', JSON.stringify(datatosave));

    this.route.navigate(['/sendInternships'])
  }
  else{
    
    // this.modalService.open;

  }
    }
  

  
    download(pdf_file: any){

      this.internshipsService.download(pdf_file).subscribe((data: any) => {

          saveAs(data, `Company Internship Document ${new Date().toLocaleDateString('en-GB')}.pdf`)
         

      });

    }



  getAvailableInternships() {
    this.internshipsService.getAllavailableInternships()
      .subscribe((result: any) => {


        // const data = JSON.parse(localStorage.getItem('userdata'));

        result.availableInternship.forEach((val: any) => 
          // this.number = result.Total_availablenternship;
          // this.data = data.availableInternship;
          this.Internships.push(val));
 

        // this.spinner.hide();
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAvailableInternships();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAvailableInternships();
  }
  
  searchTitle(): void {
    this.page = 1;
    this.getAvailableInternships();
  }



  getInternshipNames() {
    this.internshipsService.getAllInternshipNames()
      .subscribe((result: any) => {


        const data = JSON.parse(localStorage.getItem('userdata')!);

        result.internshipName.forEach((data: any) => {
          // this.number = result.Total_availablenternship;
          this.data = data.internshipName;
          this.InternshipsName.push(data);
  
        });

        // this.spinner.hide();
      });
  }



  sendInternship(data: any) {

    const datatosave = {
      sendInternship: true,
      data
    }

    //saving data in the local storage
    localStorage.setItem('INTERNSHIPdata', JSON.stringify(datatosave));

    this.route.navigate(['/sendInternships'])
  }

}
