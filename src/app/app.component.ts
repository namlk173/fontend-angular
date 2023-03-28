import { Token } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "angular"
  data = []

  constructor() { }

  ngOnInit() {
  }
}
