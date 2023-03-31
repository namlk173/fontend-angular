import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Post } from "../model/post.model"
import { BASE_URL } from "../util/config/base.config"

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private httpClient: HttpClient) { }
  public GetAllPost(skip: number, limit: number): Observable<Post[]> {
    let params = new HttpParams().set("skip", skip).set("limit", limit)
    return this.httpClient.get<Post[]>(`${BASE_URL}api/v1/post/all`, { params: params })
  }

  public CreatePost(post: Partial<Post>) {
    const formPostData = new FormData()
    Object.entries(post).forEach(([key, value]) => {
      if (key !== "owner") {
        formPostData.append(key, value as any)
      }
    })
    console.log(formPostData)
    return this.httpClient.post(`${BASE_URL}api/v1/post/create`, formPostData)
  }

  public DeletePost(_id: string) {
    let params = new HttpParams().set("_id", _id)
    return this.httpClient.delete(`${BASE_URL}api/v1/post/delete`, { params: params })
  }
}


