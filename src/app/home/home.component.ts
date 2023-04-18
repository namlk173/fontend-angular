import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, OnChanges {
  user: any
  response: { status?: string, message?: string } = {}
  constructor(private readonly router: Router) { }
  ngOnInit(): void {
    console.log("Home Init")
    let token = localStorage.getItem("token")
    if (!token) {
      this.router.navigate(["auth/login"])
    }
  }
  ngOnChanges(): void {
    console.log("Home change")
  }
}
