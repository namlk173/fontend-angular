import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BASE_URL } from "../util/config/base.config"

@Injectable({
  providedIn: 'root'
})

export class UserService{
  constructor(private httpClient: HttpClient) {}
  Login(email: string, password: string) {
    return this.httpClient.post(`${BASE_URL}api/v1/user/login`, {
      email: email,
      password: password,
    })
  }

  Register(username:string, email:string, password:string) {
    return this.httpClient.post(`${BASE_URL}api/v1/user/signup`, {
      username: username,
      email: email,
      password: password,
    })
  }
}


