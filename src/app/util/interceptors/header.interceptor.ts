import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timeout } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from "src/app/service/token.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token')
    token = token ? JSON.parse(token) : ""

    if (token) {
      const helper = new JwtHelperService()
      const isExpired = helper.isTokenExpired((token as any).access)
      if (!isExpired) {
        const cloneRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${(token as any).access}`) })
        return next.handle(cloneRequest)
      } else {
        localStorage.removeItem("token")
        this.tokenService.RefreshToken((token as any).refresh).subscribe((res: any) => {
          localStorage.setItem("token", JSON.stringify(res))
          token = res
        }, (err: HttpErrorResponse) => {
          localStorage.removeItem("token")
        })
        return next.handle(req.clone({ headers: req.headers.append('Authorization', `Bearer ${(token as any).access}`) }))
      }
    }
    return next.handle(req)
  }
}
