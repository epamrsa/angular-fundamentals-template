import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
}

interface UserResponse {
    successful: boolean,
    result: User
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getUser() {
        // Add your code here
        return this.httpClient.get<UserResponse>("http://localhost:4000/users/me").pipe(
            map(event => event.result)
        );
    }

}
