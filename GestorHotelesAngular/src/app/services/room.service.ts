import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { Global } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
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

  getRoomsByHotel(id: String): Observable<any> {
    return this._http.get(this.url + '/getRoomsByHotel/' + id,)
  }
}
