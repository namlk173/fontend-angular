import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { JwtHelperService } from "@auth0/angular-jwt"
import { Observable } from "rxjs"
import { User } from "../model/user.model"
import { BASE_URL } from "../util/config/base.config"

type Profile = Partial<Omit<User, "password">>

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(private httpClient: HttpClient) { }
  Login(email: string, password: string) {
    return this.httpClient.post(`${BASE_URL}api/v1/user/login`, {
      email: email,
      password: password,
    })
  }

  Register(username: string, email: string, password: string) {
    return this.httpClient.post(`${BASE_URL}api/v1/user/signup`, {
      username: username,
      email: email,
      password: password,
    })
  }

  IsLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    if (!token) {
      return false
    }
    return true
  }

  GetCurrentUser(): any {
    const token = localStorage.getItem("token")
    const helper = new JwtHelperService()
    return helper.decodeToken((JSON.parse(token as string) as any).access) as Profile
  }

  GetProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${BASE_URL}api/v1/user/profile`)
  }

  ChangeProfile(user: Profile) {
    const formUserData = new FormData()
    Object.entries(user).forEach(([key, value]) => {
      formUserData.append(key, value)
    })

    return this.httpClient.put(`${BASE_URL}api/v1/user/profile/change`, formUserData )
  }
}


