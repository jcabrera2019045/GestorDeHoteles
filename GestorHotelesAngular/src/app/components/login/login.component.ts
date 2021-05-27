import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public userModel: User;
  public token;
  public identity;
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
    this.userModel = new User("", "", "", "", "", "", "");
  }

  ngOnInit(): void {
  }

  getToken() {
    this._userService.login(this.userModel, 'true').subscribe(
      response => {
        console.log(response.findUser);
        this.token = response.Token;
        localStorage.setItem('token', this.token);
        this._router.navigate(['/hotels']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  login() {
    this._userService.login(this.userModel).subscribe(
      response => {
        console.log(response);
        this.identity = response;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.getToken();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
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
      }
    )
  }

}
