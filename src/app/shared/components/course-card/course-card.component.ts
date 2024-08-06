import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  @Input() course: {
    id: string,
    title: string,
    description: string,
    creationDate: Date,
    duration: number,
    authors: string[],
  } = {
    id: "",
    title: "",
    description: "",
    creationDate: new Date(),
    duration: 0,
    authors: [],
  };
  @Input() authors: {
    id: string,
    name: string
  }[] | null = null;
  @Input() editable: boolean | null = null;
  @Output() clickOnShow: EventEmitter<string> = new EventEmitter<string>();

  showCourseButtonClick(value: string) {
    this.clickOnShow.emit(value);
  }

  courseAuthorsNames() {
    return this.authors?.filter(author => this.course.authors.indexOf(author.id) >= 0).map(author => author.name).join(", ")
  }

}
