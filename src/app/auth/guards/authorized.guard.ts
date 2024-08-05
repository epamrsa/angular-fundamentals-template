import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad, CanActivate {
    // Add your code here

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
        if (this.authService.isAuthorised) return true;
        return this.router.createUrlTree([this.authService.getLoginUrl()]);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.authService.isAuthorised) return true;
        return this.router.createUrlTree([this.authService.getLoginUrl()]);
    }

}
