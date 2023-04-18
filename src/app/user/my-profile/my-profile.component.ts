import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';;
import { UserService } from 'src/app/service/user.service';
import { BASE_URL } from 'src/app/util/config/base.config';

type Profile = Partial<Omit<User, "password">>

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  response: { status?: string, message?: string } = {}
  baseURL = BASE_URL
  avatar: string | undefined = ""

  user: Profile = {}
  constructor(private readonly userService: UserService, private readonly router: Router) { }
  ngOnInit(): void {
    this.userService.GetProfile().subscribe(
      (res: Profile) => {
        this.user = res
        if (res.avatar_url) {
          this.avatar = this.baseURL + res.avatar_url
        }
      },
      (_: HttpErrorResponse) => {
        this.router.navigate(["/auth/login"])
        localStorage.removeItem("token")
      }
    )
  }

  onChangeProfile() {
    this.userService.ChangeProfile(this.user).subscribe(
      (res: any) => {
        this.response = { message: res.message, status: "success" }
        this.router.navigate(["/home"])
      },
      (err: HttpErrorResponse) => this.response = { message: err.error.message, status: "warning" }
    )
  }

  onSelectAvatar(target: any) {
    if (target.files) {
      this.user.avatar_file = target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(target.files[0])
      reader.onload = (event: any) => {
        this.avatar = event.target.result
      }
    }
  }
}
