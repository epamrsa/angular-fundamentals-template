import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CoursesComponent } from '@features/courses/courses.component';
import { SharedModule } from "@shared/shared.module";
import { CoursesListModule } from "@features/courses/courses-list/courses-list.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  }
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule, CoursesListModule, RouterModule.forChild(routes)],
  exports: [CoursesComponent, CoursesListModule]
})
export class CoursesModule {}
