import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Global } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public identity;
  public token;
  varHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.url = Global.url;
  }

  getIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));
    if (identity2 != undefined) {
      this.identity = identity2;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    var token2 = localStorage.token;
    if (token2 != undefined) {
      this.token = token2;
    } else {
      this.token = null;
    }
    return this.token;
  }

  regist(user: User): Observable<any> {
    let params = JSON.stringify(user);
    return this._http.post(this.url + '/registUser', params, { headers: this.varHeaders });
  }

  login(user: any, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = getToken;
    }
    let params = JSON.stringify(user);
    return this._http.post(this.url + '/loginUser', params, { headers: this.varHeaders })
  }

  editUser(user: User, userId: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    let params = JSON.stringify(user);
    return this._http.put(this.url + '/editUser/' + userId, params, { headers: headersAuthorization });
  }

  deleteUser(userId: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.delete(this.url + '/deleteUser/' + userId, { headers: headersAuthorization });
  }

  getUsers(): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.get(this.url + '/getUsers', { headers: headersAuthorization });
  }

  getHotelAdminUsers(): Observable<any> {
    return this._http.get(this.url + '/getHotelAdminUsers', { headers: this.varHeaders });
  }

  getUserById(id: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.get(this.url + '/getUserById/' + id, { headers: headersAuthorization })
  }

}
