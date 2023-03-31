import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Partial<Post> = {}
  successResponse: string = ""
  errorResponse: string = ""
  photoURL: string = ""

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter your description post...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(private readonly postService: PostService, private readonly router: Router) { }
  ngOnInit() {

  }

  onCreatePost() {
    this.postService.CreatePost(this.post).subscribe(
      (res: any) => {
        this.router.navigate(["/home"])
      },
      (err: HttpErrorResponse) => this.errorResponse = err.error.message
    )
  }

  onSelectPhoto(target: any) {
    if (target.files) {
      this.post.file = target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(target.files[0])
      reader.onload = (event: any) => {
        this.photoURL = event.target.result
      }
    }
  }

}
