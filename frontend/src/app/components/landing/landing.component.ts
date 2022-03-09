import { Component, OnInit, Inject } from '@angular/core';
import { InternshipsService } from '../../services/internships.service';
import {UsersService} from '../../services/users.service';
import { trigger, transition, useAnimation } from "@angular/animations";
import { fadeIn, fadeOut } from './carousel.animations';
import { Router } from '@angular/router';

import $ from 'jquery';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger("carouselAnimation", [
      transition("void => *", [useAnimation(fadeIn, { params: { time: '500ms' } })]),
      transition("* => void", [useAnimation(fadeOut, { params: { time: '500ms' } })]),
    ])
  ]
})
export class LandingComponent implements OnInit {

  internshipModal() {
    ($("#internshipModal")as any).modal('toggle');
  }
  
  docs = [
    // {
    //   title: "Application Form [PDF]",
    //   text: "Download and fill in the application form",
    //   downloadLink: ""
    // },
    {
      title: "NIP Terms & Conditions",
      text: "Terms and conditions for NIP",
      downloadLink: ""
    },
    {
      title: "How To Apply",
      text: "Latest document with all the steps to apply",
      downloadLink: ""
    },
    {
      title: "FAQ [PDF]",
      text: "Frequently asked questions answered here",
      downloadLink: ""
    },
    // {
    //   title: "Annual Report 2021",
    //   text: "The annual report for the year 2020 - 2021",
    //   downloadLink: ""
    // },
    {
      title: "Annual Report 2020",
      text: "The annual report for the year 2020 - 2021",
      downloadLink: ""
    }
  ]



  slides = [
    {

      src: "../../assets/images/pexels-christina-morillo-1181422.jpg",
      header: "This program is a deliberate effort by MTC to open graduates access real work integrated learning.",
      body: "",
      link: { href: "/internships", text: "View Internships" }
    },
    {
      src: "../../assets/images/pexels-christina-morillo-1181605.jpg",
      header: "National Internship Program for all and subsequently create job ready and experienced graduates.",
      body: "",
      link: { href: "/auth/signup", text: "Sign up" }
    },
    {
      src: "../../assets/images/pexels-rebrand-cities-1367272.jpg",
      header: "Key focus is to assist students that require internships to graduate.",
      body: "",
      link: { href: "/faq", text: "Learn More" }
    }
  ]
  currentSlide = 0;
  skipThisCycle = true;
  autoscrollDelay = 10000;


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
 
  availableinternships: any;
  availableInternship: any;

   // Pagination parameters.
   p: Number = 1;
   count: Number = 4;
   pageOfItems!: Array<any>;
 

  constructor(private router: Router, private internshipsService: InternshipsService, public userService: UsersService) { }

  ngOnInit(): void {

    this.getAvailableInternships();

  }


  


  
  onPreviousClick() {
    this.skipThisCycle = true;
    this.previousSlide();
  }

  onNextClick() {
    this.skipThisCycle = true;
    this.nextSlide();
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
  
  private previousSlide() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  private nextSlide() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  redirectToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

}
