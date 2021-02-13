import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('j') != null || localStorage.getItem('j') != '') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class LoggedInService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('j') == null || localStorage.getItem('j') == '') {
      return true;
    } else {
      this.router.navigate(['dashboard/demographic']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class DemoGraphic implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('demo') != 'true') {
      return true;
    } else {
      this.router.navigate(['dashboard/pretest']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root'
})

export class PreTestGiven implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('pre') == 'true') {
      return true;
    } else {
      this.router.navigate(['dashboard/pretest']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class PreTest implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('pre') != 'true') {
      return true;
    } else {
      this.router.navigate(['lectures'])
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class Lectures implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('lect') != 'true') {
      return true;
    } else {
      this.router.navigate(['dashboard/posttest'])
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class PostTest implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('pos') != 'true') {
      return true;
    } else {
      this.router.navigate(['dashboard/result'])
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class Result implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('pos') == 'true' && localStorage.getItem('pre') == 'true') {
      return true;
    } else {
      this.router.navigate(['dashboard/posttest'])
      return false;
    }
  }
}
