import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
    // Add your code here

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.isAuthorised) return true;
        return this.router.createUrlTree(["courses"]);
    }

}
