import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PosttestService} from '../../../services/posttest/posttest.service';

@Component({
  selector: 'app-explainer',
  templateUrl: './explainer.component.html',
  styleUrls: ['./explainer.component.css']
})
export class ExplainerComponent implements OnInit {

  processing = false;

  constructor(private router: Router, private postTestService: PosttestService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('lect') == null || localStorage.getItem('lect') == '') {
      this.processing = true;
      this.postTestService.getPostTest().subscribe(res => {
        if (res.questions.length > 0) {
          localStorage.setItem('lect', 'true');
          this.router.navigate(['dashboard/posttest']);
        } else {
          localStorage.setItem('lect', 'false');
        }
        this.processing = false;
      });
    }
  }

  next() {
    this.router.navigate(['/lectures/scene1']);
  }

}
