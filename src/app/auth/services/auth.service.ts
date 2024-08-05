import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { BehaviorSubject } from "rxjs";

interface User {
    "name": string,
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

    private isAuthorized$$ = new BehaviorSubject<boolean>(true);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private sessionStorageService: SessionStorageService,
        private httpClient: HttpClient
    ) {}

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        this.httpClient.post<LoginResponse>("http://localhost:4000/login", user).subscribe(event => {
            if (event.successful) {
                this.sessionStorageService.setToken(event.result);
                this.isAuthorised = true;
            }
        });
    }

    logout() {
        // Add your code here
        let headers = new HttpHeaders().set("Authorization", this.sessionStorageService.getToken()!);
        this.httpClient.delete<HttpResponse<any>>("http://localhost:4000/logout", { headers: headers }).subscribe(event => {
            if (event.status == 200) {
                this.sessionStorageService.deleteToken();
                this.isAuthorised = false;
            }
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
        return "login";
    }

}
