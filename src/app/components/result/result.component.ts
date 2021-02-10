import {Component, OnInit} from '@angular/core';
import {PosttestService} from '../../services/posttest/posttest.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  totalScore = 0;
  passed = false;
  calculatingResult = false;
  certificate: any;

  constructor(private postTestService: PosttestService, private domSanitizer: DomSanitizer, private router: Router) {
    this.calculatingResult = true;
    this.postTestService.getPostTest().subscribe(res => {
        if (res.questions.length > 0) {
          this.calculateResult(res.questions);
          this.calculatingResult = false;
        } else {
          this.calculatingResult = false;
        }
      },
      error => this.router.navigate(['/'])
    );
  }

  ngOnInit(): void {

  }

  calculateResult(data) {
    let total = 0;
    data.forEach(d => {
      if (d.answer === d.correctAnswer) {
        total++;
      }
    });
    this.totalScore = total;
    if (total > 14) {
      this.passed = true;
      this.postTestService.getCertificate(localStorage.getItem('username')).subscribe(res => {
        let int8Array = new Uint8Array(res);
        let string = String.fromCharCode.apply(null, int8Array);
        let base64 = btoa(string);
        this.certificate = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64);
      });
    } else {
      this.passed = false;
    }
  }

  // tryAgain() {
  //   console.log("hello")
  // }
}
