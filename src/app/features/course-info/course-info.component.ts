import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {

  // Use the names for the input `course`.
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

  courseAuthorsNames() {
    return this.authors.filter(author => this.course.authors.indexOf(author.id) >= 0).map(author => author.name).join(", ")
  }

}
