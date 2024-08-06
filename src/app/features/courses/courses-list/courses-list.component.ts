import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  @Input() courses: {
    id: string,
    title: string,
    description: string,
    creationDate: Date,
    duration: number,
    authors: string[],
  }[] | null = null;
  @Input() authors: {
    id: string,
    name: string
  }[] | null = null;
  @Input() editable: boolean | null = null;
  @Output() showCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();

  showCourseButtonClick(value: string) {
    this.showCourse.emit(value);
  }

  editCourseButtonClick(value: string) {
    this.editCourse.emit(value);
  }

  deleteCourseButtonClick(value: string) {
    this.deleteCourse.emit(value);
  }

}
