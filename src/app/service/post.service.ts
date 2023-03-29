import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable} from "rxjs"
import { Post } from "../model/post.model"
import { BASE_URL } from "../util/config/base.config"

@Injectable({
  providedIn: 'root'
})

export class PostService{
  constructor(private httpClient: HttpClient) {}
  public GetAllPost(skip: number, limit: number): Observable<Post[]>{
    let params = new HttpParams().set("skip", skip).set("limit", limit)
    return this.httpClient.get<Post[]>(`${BASE_URL}api/v1/post/all`, {params: params})
  }
}


