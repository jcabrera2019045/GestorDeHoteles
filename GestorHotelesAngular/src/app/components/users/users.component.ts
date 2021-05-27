import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public userModel: User;
  public users;
  public identity;

  constructor(private _userService: UserService,) {
    this.userModel = new User("", "", "", "", "", "", "",);
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        console.log(response.findUser);
        this.users = response.findUser;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getUserId(userId) {
    this._userService.getUserById(userId).subscribe(
      response => {
        this.userModel = response.findUser;
        console.log(response.findUser);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  updateUser() {
    this._userService.editUser(this.userModel, this.userModel._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Usuario actualizado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUsers();
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

  deleteUser() {
    this._userService.deleteUser(this.userModel._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario eliminado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getUsers();
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
