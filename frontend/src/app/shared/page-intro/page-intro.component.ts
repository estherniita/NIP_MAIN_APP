import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  templateUrl: './page-intro.component.html',
  styleUrls: ['./page-intro.component.scss']
})
export class PageIntroComponent implements OnInit {

  @Input() title?: string;
  @Input() image?: string;
  introBackground = 'url("assets/images/cubes-2492010_1920.jpg")';
  constructor() { }

  ngOnInit(): void {
  }

}
