import { Component } from '@angular/core';
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {

  // Use the names for the input `course`.
  course: {
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
  authors: {
    id: string,
    name: string
  }[] = [];

  constructor(
      private coursesStoreService: CoursesStoreService,
      private route: ActivatedRoute,
      private location: Location
  ) {
    this.coursesStoreService.authors$.subscribe(event => this.authors = event);
    this.coursesStoreService.courses$.subscribe(event => this.course = {
      id: event[0].id,
      title: event[0].title,
      description: event[0].description,
      duration: event[0].duration,
      creationDate: new Date(event[0].creationDate),
      authors: event[0].authors
    });
    this.coursesStoreService.getAllAuthors();
    this.coursesStoreService.getCourse(this.route.snapshot.paramMap.get('id')!);
  }

  courseAuthorsNames() {
    return this.authors.filter(author => this.course.authors.indexOf(author.id) >= 0).map(author => author.name).join(", ")
  }

  backButtonClick() {
    this.location.back();
  }

}
