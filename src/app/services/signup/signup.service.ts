import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment }  from '../../../environments/environment';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  SERVER:string = `${environment.apiURL}/users/signup`;
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  constructor( private http: HttpClient ) { }

  signUp(data): Observable<any>{
    return this.http.post(this.SERVER, data, {headers: this.headers});
  }
}
