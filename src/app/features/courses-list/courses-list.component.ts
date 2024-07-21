import {Component, EventEmitter, Input, Output} from '@angular/core';

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
  }[] = [];
  @Input() authors: {
    id: string,
    name: string
  }[] = [];
  @Input() editable: boolean = false;
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
