import { Observable, tap } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from "@angular/router";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { AuthService } from "@app/auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here

    constructor(
        private authService: AuthService,
        private sessionStorageService: SessionStorageService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = this.authService.isAuthorised ?
            req.clone({headers: req.headers.set("Authorization", this.sessionStorageService.getToken()!)}) :
            req;
        return next.handle(authReq).pipe(tap(event => {
            if (event.type === HttpEventType.Response && event.status == 401) {
                this.authService.logout();
            }
        }));
    }

}
