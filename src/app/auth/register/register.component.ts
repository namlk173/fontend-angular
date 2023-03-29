import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = ""
  email: string = ""
  password: string = ""
  passwordConfirm: string = ""
  authResponseErr: string = ""
  authResponseSuccess: string = ""


  constructor(private readonly userService: UserService) { }
  ngOnInit(): void { }

  validateUser(): boolean {
    if (!this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.authResponseErr = "Email not valid!"
      return false
    }
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
    return true
  }

  onRegister() {
    if (!this.validateUser()) {
      return
    }
    this.userService.Register(this.username, this.email, this.password).subscribe((res: any) => {
      this.authResponseSuccess = res.message
      this.authResponseErr = ""
    }, (err: HttpErrorResponse) => {
      this.authResponseErr = err.error.message
    }
    )
  }
}
