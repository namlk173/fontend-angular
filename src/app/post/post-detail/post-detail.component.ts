import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BASE_URL } from 'src/app/util/config/base.config';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: any
  @Input() user: any

  @Output() deletePost = new EventEmitter<string>()

  baseURL = BASE_URL
  showMore: boolean = false
  constructor() {

  }
  ngOnInit(): void {

  }
}
