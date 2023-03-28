import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})

export class UserService{
  constructor(private httpClient: HttpClient) {}
  Login(email: string, password: string) {
    return this.httpClient.post("http://127.0.0.1:8080/api/v1/user/login", {
      email: email,
      password: password,
    })
  }

  Register(username:string, email:string, password:string) {
    return this.httpClient.post("http://127.0.0.1:8080/api/v1/user/signup", {
      username: username,
      email: email,
      password: password,
    })
  }
}


