import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { Global } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
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

  createHotel(hotel: Hotel): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    let params = JSON.stringify(hotel);
    return this._http.post(this.url + '/createHotel/', params, { headers: headersAuthorization });
  }

  updateHotel(hotel: Hotel, hotelId: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    let params = JSON.stringify(hotel);
    return this._http.put(this.url + '/updateHotel/' + hotelId, params, { headers: headersAuthorization });
  }

  deleteHotel(hotelId: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.delete(this.url + '/deleteHotel/' + hotelId, { headers: headersAuthorization });
  }

  getHotels(): Observable<any> {
    return this._http.get(this.url + '/getHotels');
  }

  getHotelById(id: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.get(this.url + '/getHotelById/' + id, { headers: headersAuthorization })
  }

  getRoomsByHotel(id: String): Observable<any> {
    return this._http.get(this.url + '/getRoomsByHotel/' + id)
  }

  getEventByHotel(id: String): Observable<any> {
    return this._http.get(this.url + '/getEvents/' + id)
  }

}
