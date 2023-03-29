import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
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

  GetProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${BASE_URL}api/v1/user/profile`)
  }

  ChangeProfile(user: Profile) {
    return this.httpClient.put(`${BASE_URL}api/v1/user/profile/change`, {...user})
  }
}


