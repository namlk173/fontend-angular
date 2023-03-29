import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = ""
  password: string = ""
  authResponseErr: string = ""

  constructor(private readonly userService: UserService, private readonly router: Router) { }
  ngOnInit() {
    if (this.userService.IsLoggedIn()) {
      this.router.navigate(["/home"])
    }
  }

  validateUser(): boolean {
    if (!this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      this.authResponseErr = "Email not valid!"
      return false
    }
    if (!this.password) {
      this.authResponseErr = "Required password"
      return false
    }
    return true
  }


  onLogin() {
    if (!this.validateUser()) {
      return
    }
    this.userService.Login(this.email, this.password).subscribe((res: any) => {
      this.router.navigate(["home"])
      localStorage.setItem("token", JSON.stringify(res))
    },
      (err: HttpErrorResponse) => {
        this.authResponseErr = err.error.message
      }
    )
  }
}
