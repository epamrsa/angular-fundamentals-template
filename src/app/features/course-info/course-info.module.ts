import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { SharedModule } from "@shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: CourseInfoComponent
  }
];

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [CourseInfoComponent]
})
export class CourseInfoModule {}
