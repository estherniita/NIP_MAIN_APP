import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-read-all-button',
  templateUrl: './read-all-button.component.html',
  styleUrls: ['./read-all-button.component.scss']
})
export class ReadAllButtonComponent implements OnInit {

  @Input()
  link?: string;

  @Input()
  text?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

//function to navigate to the specific route
  navigate() {
    this.router.navigate([this.link]);
  }

}
