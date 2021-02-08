import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PretestService {

  SERVER = `${environment.apiURL}/pretest/response`
  headers = new HttpHeaders().set('Content-Type','application/json')
  constructor(private http: HttpClient) { }

  postPretest(data): Observable<any> {
    return this.http.post(this.SERVER, data, {headers: this.headers.set('Authorization',`Bearer ${localStorage.getItem('j')}`)} );
  }

  getPretest(): Observable<any>{
    return this.http.get(this.SERVER, {headers: this.headers.set('Authorization',`Bearer ${localStorage.getItem('j')}`)});
  }
}
