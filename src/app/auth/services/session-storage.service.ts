import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { DOCUMENT } from "@angular/common";

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here
const WINDOW = new InjectionToken<Window>(
    'An abstraction over global window object',
    {
        factory: () => inject(DOCUMENT).defaultView!
    }
);

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

    constructor(
        @Inject(WINDOW) private window: Window
    ) {}

    setToken(token: string){
        // Add your code here
        window.sessionStorage.setItem(TOKEN, token);
    }

    getToken(){
        // Add your code here
        return window.sessionStorage.getItem(TOKEN);
    }

    deleteToken(){
        window.sessionStorage.removeItem(TOKEN);
    }

}
