import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from "@shared/mocks/mock";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  authors = mockedAuthorsList;
  courses = mockedCoursesList.map(course => {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      duration: course.duration,
      creationDate: new Date(course.creationDate),
      authors: course.authors
    }
  });

  logShowCourse(id: string) {
    console.log("SHOW: " + id);
  }

  logEditCourse(id: string) {
    console.log("EDIT: " + id);
  }

  logDeleteCourse(id: string) {
    console.log("DELETE: " + id);
  }

}
