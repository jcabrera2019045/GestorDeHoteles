import { Component, OnInit } from '@angular/core';
import { EventType } from 'src/app/models/eventType.model';
import { EventTypeService } from 'src/app/services/event-type.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-event-type',
  templateUrl: './event-type.component.html',
  styleUrls: ['./event-type.component.scss'],
  providers: [UserService, EventTypeService]
})
export class EventTypeComponent implements OnInit {
  public eventTypeModel: EventType;
  public identity;
  public eventTypes;
  constructor(private _userService: UserService, private _eventTypeService: EventTypeService) {
    this.identity = this._userService.getIdentity();
    this.eventTypeModel = new EventType("", "", "",);
  }

  ngOnInit(): void {
    this.getEventTypes();
  }

  getEventTypes() {
    this._eventTypeService.getEventTypes().subscribe(
      response => {
        this.eventTypes = response.eventType;
        console.log(this.eventTypes);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getEventTypeId(eventTypeId) {
    this._eventTypeService.getEventTypeById(eventTypeId).subscribe(
      response => {
        this.eventTypeModel = response.eventType;
        console.log(this.eventTypeModel);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  createEventType() {
    this._eventTypeService.createEventType(this.eventTypeModel).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo Evento creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEventTypes();
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      },
    )
  }

  updateEventType() {
    this._eventTypeService.updateEventType(this.eventTypeModel, this.eventTypeModel._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo Evento actualizado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEventTypes();
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      },
    )
  }

  deleteEventType() {
    this._eventTypeService.deleteEventType(this.eventTypeModel._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo Evento eliminado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getEventTypes();
      },
      error => {
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      },
    )
  }

}
