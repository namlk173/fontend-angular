import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';

type Profile = Omit<User, "password">

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user: Profile = {}
  constructor(private readonly router: Router) { }
  ngOnInit(): void { }

  onLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.router.navigate(["auth/login"])
  }

}
