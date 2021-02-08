import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  SERVER: string = `${environment.apiURL}/users/dashboard`;
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${localStorage.getItem('j')}`);

  constructor(private http: HttpClient) { }

  getDashboard():Observable<any>{
    return this.http.get(`${this.SERVER}`,{ headers: this.headers});
  }
}
