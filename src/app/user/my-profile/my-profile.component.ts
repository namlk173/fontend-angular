import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';

type Profile = Partial<Omit<User, "password">>

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  responseErr: string = ""
  responseSuccess: string = ""

  user: Profile = {}
  constructor(private readonly userService: UserService, private readonly router: Router) { }
  ngOnInit(): void {
    this.userService.GetProfile().subscribe(
      (res: Profile) => {
        this.user = res
      },
      (_: HttpErrorResponse) => {
        this.router.navigate(["/auth/login"])
        localStorage.removeItem("token")
      }
    )
  }

  onChangeProfile() {
    this.userService.ChangeProfile(this.user).subscribe(
      (res: any) => this.responseSuccess = res.message,
      (err: HttpErrorResponse) => console.log(err)
    )
  }
}
