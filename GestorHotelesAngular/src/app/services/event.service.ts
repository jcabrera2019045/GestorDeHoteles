import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { Global } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public url: String;
  constructor(public _http: HttpClient) {
    this.url = Global.url;
  }

  createEvent(event: Event, hotelId: String, eventTypeId: String): Observable<any> {
    let params = JSON.stringify(event);
    let varHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + '/createHotel/' + hotelId + '/' + eventTypeId, params, { headers: varHeaders });
  }

  updateEvent(event: Event, eventId: String): Observable<any> {
    let params = JSON.stringify(event);
    let varHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + '/updateEvent/' + eventId, params, { headers: varHeaders });
  }

  deleteEvent(eventId: String): Observable<any> {
    let varHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + '/deleteEvent/' + eventId, { headers: varHeaders });
  }

  getEvents(): Observable<any> {
    let varHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + '/getEvents', { headers: varHeaders });
  }

}
