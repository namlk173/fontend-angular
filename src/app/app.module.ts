import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './common/header/header.component'
import { HeaderInterceptor } from './util/interceptors/header.interceptor';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MessageComponent } from './common/message/message.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostListComponent,
    PostDetailComponent,
    HomeComponent,
    MyProfileComponent,
    LoginComponent,
    RegisterComponent,
    CreatePostComponent,
    MessageComponent,
    EditPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}


