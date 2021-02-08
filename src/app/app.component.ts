import {Component, OnInit} from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'V2-Redu';

  ngOnInit() {
    AOS.init({
      duration: 700,
      easing: 'ease-in-out'
    })
  }
}
