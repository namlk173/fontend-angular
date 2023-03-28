import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})

export class PostService{
  constructor(private httpClient: HttpClient) {}
  public GetAllPost() {
    return this.httpClient.get("http://127.0.0.1:8080/api/v1/post/all?skip=0&limit=10")
  }
}


