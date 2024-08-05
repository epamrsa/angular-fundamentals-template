import { Injectable } from '@angular/core';
import { UserService } from "@app/user/services/user.service";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private isAdmin$$ = new BehaviorSubject(true);
    private name$$ = new BehaviorSubject<string>("");
    public isAdmin$ = this.isAdmin$$.asObservable();
    public name$ = this.name$$.asObservable();

    constructor(
        private userService: UserService
    ) {}

    getUser() {
        return this.userService.getUser().pipe(tap(event => {
            this.name$$.next(event.name);
            this.isAdmin = event.role == "admin";
        }));
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}
