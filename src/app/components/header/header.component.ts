import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {LoginService} from '../../services/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: any;
  loggingOut = false;

  constructor(private dashboardService: DashboardService, private loginService: LoginService, private router: Router) {
    if (localStorage.getItem('username') == null || localStorage.getItem('username') == '') {
      this.dashboardService.getDashboard().subscribe(res => {
        if (res) {
          this.name = res.user.username;
          localStorage.setItem('username', this.name);
        } else {
          this.router.navigate(['/']);
        }
      }, err => {
        localStorage.setItem('j', '');
        this.router.navigate(['/']);
      });
    }else {
      this.name = localStorage.getItem('username')
    }
  }

  Logout() {
    this.loggingOut = true;
    this.loginService.logout().subscribe(res => {
      localStorage.setItem('j', '');
      this.loggingOut = false;
      this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
  }

}
