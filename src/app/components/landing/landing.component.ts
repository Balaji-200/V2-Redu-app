import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  windowScrolled: boolean;
  scrollPosition: number;
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  onWindowScroll(e){
    this.windowScrolled = e.srcElement.scrollTop > 400 ? true: false;
  }

  // tslint:disable-next-line:typedef
  scrollToTop() {
    document.getElementById("head").scrollIntoView({
      behavior: 'smooth'
    });
  }
  ngOnInit(): void {
  }
}
