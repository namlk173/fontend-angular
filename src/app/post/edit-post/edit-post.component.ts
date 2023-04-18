import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/service/post.service';
import { BASE_URL } from 'src/app/util/config/base.config';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: any = {}
  notFoundPost = false
  response: { status?: string, message?: string } = {}
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

  photoURL: string
  constructor(private readonly postService: PostService, private readonly activateRouter: ActivatedRoute, private readonly router: Router) {}
  ngOnInit(): void {
    let slug = this.activateRouter.snapshot.paramMap.get('slug');
    this.postService.GetPost(slug).subscribe(
      (res: any) => {
        this.post = res
        if(this.post.image) {
          this.photoURL = BASE_URL + this.post.image
        }
      },
      (_: HttpErrorResponse) => {this.notFoundPost = true}
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

  onUpdatePost(){
    this.postService.UpdatePost(this.post).subscribe(
      (res: any) => {
        this.router.navigate(["/home"])
      },
      (err: HttpErrorResponse) => this.response = { message: err.error.message, status: "warning" }
    )
  }
}
