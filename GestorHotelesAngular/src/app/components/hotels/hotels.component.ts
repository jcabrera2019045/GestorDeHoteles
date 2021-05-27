import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { Room } from 'src/app/models/room.model';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService, UserService]
})
export class HotelsComponent implements OnInit {
  public hotelModel: Hotel;
  public roomModel: Room;
  public hotels;
  public user;
  public room;
  public event;
  public identity;
  constructor(private _hotelService: HotelService, private _userService: UserService, private _router: Router) {
    this.hotelModel = new Hotel("", "", "", "");
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getHotels();
    this.getHotelAdminUsers();
  }

  getHotels() {
    this._hotelService.getHotels().subscribe(
      response => {
        console.log(response.Hotel);
        this.hotels = response.Hotel;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getHotelId(hotelId) {
    this._hotelService.getHotelById(hotelId).subscribe(
      response => {
        this.hotelModel = response;
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getHotelAndRoomId(hotelId) {
    this._hotelService.getHotelById(hotelId).subscribe(
      response => {
        this.hotelModel = response;
        console.log(response);
        this.getRoomByHotel(this.hotelModel._id);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getHotelAndEventId(hotelId) {
    this._hotelService.getHotelById(hotelId).subscribe(
      response => {
        this.hotelModel = response;
        console.log(response);
        this.getEventByHotel(this.hotelModel._id);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getHotelAdminUsers() {
    this._userService.getHotelAdminUsers().subscribe(
      response => {
        this.user = response.findUser;
        console.log(response);
      }
    )
  }

  updateHotel() {
    this._hotelService.updateHotel(this.hotelModel, this.hotelModel._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Hotel actualizado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getHotels();
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

  deleteHotel() {
    this._hotelService.deleteHotel(this.hotelModel._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Hotel eliminado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getHotels();
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

  createHotel() {
    this._hotelService.createHotel(this.hotelModel,).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Hotel creado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getHotels();
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

  getRoomByHotel(hotelId) {
    this._hotelService.getRoomsByHotel(hotelId).subscribe(
      response => {
        this.room = response.findedRoom;
        console.log(response.findedRoom);
      },
      error => {
        this.room = [],
          console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.mensaje,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  getEventByHotel(hotelId) {
    this._hotelService.getEventByHotel(hotelId).subscribe(
      response => {
        this.event = response;
        console.log(response);
      },
      error => {
        this.event = [],
          console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.Error,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

}
