import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: "auth", component: AuthComponent, children: [
      {
        path: "login", component: LoginComponent
      },
      {
        path: "register", component: RegisterComponent
      }
    ]
  },
  {
    path: "home", component: HomeComponent, children: [
      {
        path: "", component: PostListComponent
      },
      {
        path: "my-profile", component: MyProfileComponent
      },
    ]
  },
  {
    path: "", redirectTo: "auth/login", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
