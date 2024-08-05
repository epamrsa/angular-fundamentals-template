import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    // Add your code here

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isAuthorised) return true;
        return this.router.createUrlTree([this.authService.getLoginUrl()]);
    }

}
