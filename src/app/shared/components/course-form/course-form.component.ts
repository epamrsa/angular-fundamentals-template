import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { authorValidator } from "@shared/directives/author.directive";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import * as uuid from 'uuid';
import { combineLatest, filter } from "rxjs";

class Author {
  constructor(public id: string, public name: string | null) {
  }
  toString() {
    return this.name != null ? this.name : "";
  }
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {

  courseForm = this.fb.group({
    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
    title: ["", [Validators.required, Validators.minLength(2)]],
    description: ["", [Validators.required, Validators.minLength(2)]],
    author: ["", [Validators.minLength(2), authorValidator(2)]],
    authors: this.fb.array([]),
    courseAuthors: this.fb.array([]),
    duration: ["", [Validators.required, Validators.min(0)]]
  });
  submitted = false;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.library.addIconPacks(fas);
    if(this.route.snapshot.paramMap.get('id') != null) {
      combineLatest(
          this.coursesStoreService.courses$.pipe(filter(event => event != null && event.length > 0)),
          this.coursesStoreService.authors$.pipe(filter(event => event != null && event.length > 0))
      ).subscribe(event => {
        this.courseForm.patchValue({
          title: event[0][0].title,
          description: event[0][0].description,
          duration: event[0][0].duration.toString()
        }, {
          emitEvent: false
        });
        this.courseForm.controls.courseAuthors.clear();
        this.courseForm.controls.authors.clear();
        event[1].forEach(value => {
          if(event[0][0].authors.includes(value.id)) {
            this.courseForm.controls.courseAuthors.push(this.fb.control(new Author(value.id, value.name)));
          } else {
            this.courseForm.controls.authors.push(this.fb.control(new Author(value.id, value.name)));
          }
        });
      });
      this.coursesStoreService.getCourse(this.route.snapshot.paramMap.get('id')!);
      this.coursesStoreService.getAllAuthors();
    }
  }

  createAuthor() {
    if (this.courseForm.controls.authors.valid) {
      this.courseForm.controls.authors.push(this.fb.control(new Author(uuid.v4(), this.courseForm.controls.author.value)));
      this.courseForm.controls.author.setValue("");
    }
  }

  addToCourseAuthors(index: number) {
    this.courseForm.controls.courseAuthors.push(this.courseForm.controls.authors.at(index));
    this.courseForm.controls.authors.removeAt(index)
  }

  removeFromCourseAuthors(index: number) {
    this.courseForm.controls.authors.push(this.courseForm.controls.courseAuthors.at(index));
    this.courseForm.controls.courseAuthors.removeAt(index)
  }

  cancelButtonClick() {
    this.location.back();
  }

}
