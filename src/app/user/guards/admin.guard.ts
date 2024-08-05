import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    // Add your code here

    constructor(
        private userStoreService: UserStoreService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.userStoreService.isAdmin) return true;
        else return this.router.createUrlTree(["/courses"]);
    }

}
