import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.GetAllPost(0, this.limit).subscribe((res: any) => {
      this.posts = res
    })
  }

  onLoadMore(){
    this.page = this.page + 1
    this.postService.GetAllPost(this.limit*this.page, this.limit).subscribe((res: any) => {
      this.posts = [...this.posts, ...res]
    })
  }

}
