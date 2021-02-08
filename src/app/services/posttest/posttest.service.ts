import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosttestService {

  SERVER = `${environment.apiURL}/posttest/response`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  postPostTest(data): Observable<any> {
    return this.http.post(this.SERVER, data, {headers: this.headers.set('Authorization', `Bearer ${localStorage.getItem('j')}`)});
  }

  getPostTest(): Observable<any> {
    return this.http.get(this.SERVER, {headers: this.headers.set('Authorization', `Bearer ${localStorage.getItem('j')}`)});
  }

  setPostTestDate(): Observable<any>{
    return this.http.post(`${this.SERVER}/setDate`, {}, {headers: this.headers.set('Authorization', `Bearer ${localStorage.getItem('j')}`)});
  }
  getCertificate(name): Observable<ArrayBuffer> {
    return this.http.get(`${environment.genCertiUrl}`, {
      params: {
        username: `${name}`
      },
      responseType:'arraybuffer'
    });
  }
}
