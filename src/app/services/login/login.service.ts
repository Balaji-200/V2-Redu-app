import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  SERVER: string = `${environment.apiURL}/users/login`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  resetLink(data): Observable<any>{
    return this.http.post(`${environment.apiURL}/users/resetPassword`, data, {headers: this.headers});
  }

  verifyResetLink(data): Observable<any>{
    return this.http.get(`${environment.apiURL}/users/resetPassword?token=${data}`, {headers: this.headers});
  }

  resetPassword(data): Observable<any>{
    return this.http.post(`${environment.apiURL}/users/resetPassword/reset`, data, {headers: this.headers});
  }

  login(data): Observable<any> {
    return this.http.post<User>(this.SERVER, data, {headers: this.headers});
  }

  logout(): Observable<any>{
    return this.http.get(`${environment.apiURL}/users/logout`, { headers: this.headers.set('Authorization',`Bearer ${localStorage.getItem('j')}`) });
  }
}
