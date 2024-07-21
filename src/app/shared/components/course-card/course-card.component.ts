import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { formatDate } from "@angular/common";

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
  }[] = [];
  @Input() editable: boolean = false;
  @Output() clickOnShow: EventEmitter<string> = new EventEmitter<string>();

  constructor(
      @Inject(LOCALE_ID) private localeId: string
  ) {}

  showCourseButtonClick(value: string) {
    this.clickOnShow.emit(value);
  }

  courseDateFormatted() {
    return formatDate(this.course.creationDate, "dd.MM.yyyy", this.localeId);
  }

  courseDurationFormatted() {
    if (this.course.duration < 60) return this.course.duration + " minutes";
    else return Math.floor(this.course.duration / 60) + ":" + this.course.duration % 60 + " hours";
  }

  courseAuthorsNames() {
    return this.authors.filter(author => this.course.authors.indexOf(author.id) >= 0).map(author => author.name).join(", ")
  }

}
