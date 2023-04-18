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
    return this.httpClient.get<Post[]>(`${BASE_URL}api/v1/post/all`, { params: params }).pipe()
  }

  public CreatePost(post: Partial<Post>) {
    const formPostData = new FormData()
    Object.entries(post).forEach(([key, value]) => {
      if (key !== "owner") {
        formPostData.append(key, value as any)
      }
    })
    return this.httpClient.post(`${BASE_URL}api/v1/post/create`, formPostData)
  }

  public DeletePost(_id: string) {
    let params = new HttpParams().set("_id", _id)
    return this.httpClient.delete(`${BASE_URL}api/v1/post/delete`, { params: params })
  }

  public GetPost(id: string|null): Observable<Post> {
    let params = new HttpParams().set("_id", id as string)
    return this.httpClient.get<Post>(`${BASE_URL}api/v1/post/detail`, { params: params }).pipe()
  }

  public UpdatePost(post: Post) {
    const formPostData = new FormData()
    Object.entries(post).forEach(([key, value]) => {
      formPostData.append(key, value)
    })

    return this.httpClient.put(`${BASE_URL}api/v1/post/update?_id=${post._id}`, formPostData )
  }
}


