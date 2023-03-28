import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { BASE_URL } from "../util/config/base.config"

@Injectable({
  providedIn: 'root'
})

export class TokenService{
  constructor(private httpClient: HttpClient) {}
  public RefreshToken(refresh: string): Observable<any>{
    return this.httpClient.post(`${BASE_URL}api/v1/user/refresh`, {refresh: refresh})
  }
}

