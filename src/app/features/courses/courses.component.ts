import { map } from "rxjs";
import { Component } from '@angular/core';
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$ = this.coursesStoreService.courses$.pipe(map(courses => courses.map(course => {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      creationDate: new Date(course.creationDate),
      authors: course.authors
    }
  })));
  authors$ = this.coursesStoreService.authors$;
  editable$ = this.userStoreService.isAdmin$;

  constructor(
      private coursesStoreService: CoursesStoreService,
      private userStoreService: UserStoreService,
      private router: Router
  ) {
    this.coursesStoreService.getAll();
    this.coursesStoreService.getAllAuthors();
  }

  showCourseButtonClick(value: string) {
    this.router.navigateByUrl(`/courses/${value}`);
  }

  editCourseButtonClick(value: string) {
    //this.editCourse.emit(value);
  }

  deleteCourseButtonClick(value: string) {
    //this.deleteCourse.emit(value);
  }

  searchButtonClick(value: string) {
    this.coursesStoreService.filterCourses(value);
  }

}
