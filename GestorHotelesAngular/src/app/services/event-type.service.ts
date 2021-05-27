import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventType } from '../models/eventType.model';
import { Global } from './global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  public url: String;
  public identity;
  public token;
  varHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(public _http: HttpClient) {
    this.url = Global.url;
  }

  createEventType(eventType: EventType,): Observable<any> {
    let params = JSON.stringify(eventType);
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.post(this.url + '/createEventType', params, { headers: headersAuthorization });
  }

  updateEventType(eventType: EventType, eventTypeId: String): Observable<any> {
    let params = JSON.stringify(eventType);
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.put(this.url + '/updateEventType/' + eventTypeId, params, { headers: headersAuthorization });
  }

  deleteEventType(eventTypeId: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.delete(this.url + '/deleteEventType/' + eventTypeId, { headers: headersAuthorization });
  }

  getEventTypes(): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.get(this.url + '/getEventTypes', { headers: headersAuthorization });
  }

  getEventTypeById(eventTypeId: String): Observable<any> {
    let headersAuthorization = this.varHeaders.set('Authorization', this.getToken())
    return this._http.get(this.url + '/getEventTypeById/' + eventTypeId, { headers: headersAuthorization });
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
}
