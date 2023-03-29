import { Component, OnInit } from '@angular/core';
import { User } from './model/user.model';


type Profile = Omit<User, "password">
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "angular"
  data = []
  user: any
  constructor() { }

  ngOnInit() {
    console.log("app run")
  }
}

