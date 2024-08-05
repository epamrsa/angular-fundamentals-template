import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from "@shared/components";
import { CoursesComponent } from "@features/courses/courses.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";

export const routes: Routes = [
    /* Add your code here */
    { path: "login", component: LoginFormComponent },
    { path: "registration", component: RegistrationFormComponent },
    { path: "courses", component: CoursesComponent },
    { path: "courses/add", component: CourseFormComponent },
    { path: "courses/:id", component: CourseInfoComponent },
    { path: "course/edit/:id", component: CourseFormComponent },
    { path: "**", component: CoursesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
