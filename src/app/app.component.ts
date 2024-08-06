import { Component } from '@angular/core';
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'courses-app';

  constructor(
      private authService: AuthService,
      private userStoreService: UserStoreService
  ) {}

  isAuthorized() {
    return this.authService.isAuthorised;
  }

  logout() {
    this.authService.logout();
  }

  getUserName() {
    return this.userStoreService.name$;
  }

  logShowCourse(id: string) {
    console.log("SHOW: " + id);
  }

  logEditCourse(id: string) {
    console.log("EDIT: " + id);
  }

  logDeleteCourse(id: string) {
    console.log("DELETE: " + id);
  }

  logSearch(value: string) {
    console.log("SEARCH: " + value);
  }

}
