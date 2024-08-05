import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from "@shared/components";
import { CoursesComponent } from "@features/courses/courses.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { AdminGuard } from "@app/user/guards/admin.guard";

export const routes: Routes = [
    /* Add your code here */
    { path: "login", component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: "registration", component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: "courses", component: CoursesComponent, canLoad: [AuthorizedGuard] },
    { path: "courses/add", component: CourseFormComponent, canLoad: [AuthorizedGuard], canActivate: [AdminGuard] },
    { path: "courses/:id", component: CourseInfoComponent, canLoad: [AuthorizedGuard] },
    { path: "course/edit/:id", component: CourseFormComponent, canLoad: [AuthorizedGuard], canActivate: [AdminGuard] },
    { path: "**", component: CoursesComponent, canLoad: [AuthorizedGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
