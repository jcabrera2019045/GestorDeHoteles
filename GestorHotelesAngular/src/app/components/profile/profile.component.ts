import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  public userModel: User;
  public identity;
  public profile;

  constructor(private _userService: UserService, private _router: Router,) {
    this.userModel = new User("", "", "", "", "", "", "",);
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.getUserId(this.identity._id);
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
          title: '¡Perfil actualizado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
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
    this._userService.deleteUser(this.identity._id).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario eliminado exitosamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(['/login']);
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
