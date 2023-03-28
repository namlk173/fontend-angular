import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';

interface LoginResponse {
  access: string,
  refresh: string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = ""
  password: string = ""
  loginResponse: string = ""

  constructor(private userSevice: UserService, private postService: PostService) {}

  ngOnInit(): void {
  }

  onLogin() {
    this.userSevice.Login(this.email, this.password).subscribe((res: unknown)=> {
      localStorage.setItem("access", (res as LoginResponse).access)
      localStorage.setItem("refesh", (res as LoginResponse).refresh)
    },
      (err: HttpErrorResponse) => {
        this.loginResponse = err.error.message
      }
    )
  }

}
