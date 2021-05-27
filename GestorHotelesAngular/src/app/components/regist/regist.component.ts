import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.scss'],
  providers: [UserService]
})
export class RegistComponent implements OnInit {
  public user: User;
  constructor(private _userService: UserService,
    private _router: Router,) {
    this.user = new User("", "", "", "", "", "", "",);
  }

  ngOnInit(): void {
  }

  regist() {
    this._userService.regist(this.user).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Te has registrado exitosamente!',
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
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      },
    )
  }

}
