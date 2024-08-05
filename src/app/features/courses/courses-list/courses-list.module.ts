import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from '@features/courses/courses-list/courses-list.component';
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [CoursesListComponent],
  imports: [CommonModule, SharedModule],
  exports: [CoursesListComponent]
})
export class CoursesListModule {}