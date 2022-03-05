import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.scss']
})
export class IntroSectionComponent implements OnInit {

  @Input() title?: string;
  introBackground = 'url("assets/images/7.jpeg")';

  constructor() { }

  ngOnInit(): void {
  }

}
