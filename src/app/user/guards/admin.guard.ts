import { Observable } from "rxjs";
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

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.userStoreService.getUser();
        if (this.userStoreService.isAdmin) return true;
        else return this.router.navigate(["courses"]);
    }
}
