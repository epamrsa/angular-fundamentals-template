import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from "./services/user.service";
import { UserStoreService } from "./services/user-store.service";
import { Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        UserStoreService,
        Router
    ]
})
export class UserModule {}
