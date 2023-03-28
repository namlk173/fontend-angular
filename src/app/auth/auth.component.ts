import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username: string = ""
  email: string = ""
  password: string = ""
  passwordConfirm: string = ""
  authResponseErr: string = ""
  authResponseSuccess: string = ""
  tab: string = "login"

  constructor(private userSevice: UserService) { }

  ngOnInit(): void {
  }

  validateUser(): boolean {
    if (!this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.authResponseErr = "Email not valid!"
      return false
    }
    if (this.tab !== "login") {
      if (this.username.length < 3) {
        this.authResponseErr = "Username too short!"
        return false
      }
      if (this.password !== this.passwordConfirm) {
        this.authResponseErr = "Password and password confirm not match!"
        return false
      } else {
        if (this.password.length < 6) {
          this.authResponseErr = "Password too short"
          return false
        }
      }
    } else {
      if (!this.password) {
        this.authResponseErr = "Required password"
        return false
      }
    }
    return true
  }

  onLogin() {
    if (!this.validateUser()) {
      return
    }
    this.userSevice.Login(this.email, this.password).subscribe((res: any) => {
      localStorage.setItem("token", JSON.stringify(res))
    },
      (err: HttpErrorResponse) => {
        this.authResponseErr = err.error.message
        this.authResponseSuccess = ""
      }
    )
  }

  onRegister() {
    if (!this.validateUser()) {
      return
    }
    this.userSevice.Register(this.username, this.email, this.password).subscribe((res: any) => {
      this.authResponseSuccess = res.message
      this.tab = "login"
      this.authResponseErr = ""
    }, (err: HttpErrorResponse) => {
      this.authResponseErr = err.error.message
    }
    )
  }
}
