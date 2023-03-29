import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  page = 0
  limit = 2
  posts: any = []
  constructor(private readonly postService: PostService, private readonly router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem("token")
    console.log("post-list Init")
    if (token) {
      this.postService.GetAllPost(0, this.limit).subscribe((res: any) => {
        this.posts = res
      }, (_: HttpErrorResponse) => {
        this.router.navigate(["/auth/login"])
      })
    }
  }

  onLoadMore() {
    this.page = this.page + 1
    this.postService.GetAllPost(this.limit * this.page, this.limit).subscribe((res: any) => {
      if (res) {
        this.posts = [...this.posts, ...res]
      }
    }, (_: HttpErrorResponse) => {
      this.router.navigate(["/auth/login"])
    })
  }

}
