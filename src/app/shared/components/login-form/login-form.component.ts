import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  @ViewChild("email") public email!: NgModel;
  @ViewChild("password") public password!: NgModel;
  emailValue!: string;
  passwordValue!: string;

  constructor(
    private authService: AuthService
  ) {}

  login(event: any) {
    this.loginForm.onSubmit(event);
    if(this.email.errors == null) {
      this.authService.login({email: this.emailValue!, password: this.passwordValue!, name: null});
    }
  }

}
