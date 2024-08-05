import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CoursesComponent } from '@features/courses/courses.component';
import { SharedModule } from "@shared/shared.module";
import { CoursesListModule } from "@features/courses/courses-list/courses-list.module";

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, SharedModule, CoursesListModule],
  exports: [CoursesComponent, CoursesListModule]
})
export class CoursesModule {}
