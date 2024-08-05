import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from "@shared/components";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { AdminGuard } from "@app/user/guards/admin.guard";
import { AuthModule } from "@app/auth/auth.module";
import { UserModule } from "@app/user/user.module";

const routes: Routes = [
    /* Add your code here */
    {
        path: "login",
        component: LoginFormComponent,
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: "registration",
        component: RegistrationFormComponent,
        canActivate: [NotAuthorizedGuard]
    },
    {
        path: "courses",
        loadChildren: () => import('@features/courses/courses.module').then(m => m.CoursesModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: "courses/add",
        component: CourseFormComponent,
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: "courses/:id",
        loadChildren: () => import('@features/course-info/course-info.module').then(m => m.CourseInfoModule),
        canLoad: [AuthorizedGuard]
    },
    {
        path: "course/edit/:id",
        component: CourseFormComponent,
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard]
    },
    {
        path: "**",
        loadChildren: () => import('@features/courses/courses.module').then(m => m.CoursesModule),
        canLoad: [AuthorizedGuard],
        canActivate: [AuthorizedGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), AuthModule, UserModule],
    providers: [AuthorizedGuard, NotAuthorizedGuard, AdminGuard],
    exports: [RouterModule]
})
export class AppRoutingModule {}
