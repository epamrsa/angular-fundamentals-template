import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

export interface User {
    "name": string | null,
    "email": string,
    "password": string
}

interface LoginResponse {
    "successful": boolean,
    "result": string,
    "user": {
        "name": string,
        "email": string
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthorized$$ = new BehaviorSubject<boolean>(this.sessionStorageService.getToken() != null);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private sessionStorageService: SessionStorageService,
        private httpClient: HttpClient,
        private router: Router
    ) {}

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        this.httpClient.post<LoginResponse>("http://localhost:4000/login", user).subscribe(event => {
            if (event.successful) {
                this.sessionStorageService.setToken(event.result);
                this.isAuthorised = true;
                this.router.navigateByUrl("/courses");
            }
        });
    }

    logout() {
        // Add your code here
        this.httpClient.delete<any>("http://localhost:4000/logout").subscribe(() => {
            this.sessionStorageService.deleteToken();
            this.isAuthorised = false;
            this.router.navigateByUrl("/login");
        });
    }

    register(user: User) { // replace 'any' with the required interface
        // Add your code here
        this.httpClient.post<any>("http://localhost:4000/register", user).subscribe();
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return "/login";
    }

}
