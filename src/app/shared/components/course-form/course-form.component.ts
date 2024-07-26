import { Component } from '@angular/core';
import {
  FormBuilder, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { authorValidator } from "@shared/directives/author.directive";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm = this.fb.group({
    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
    title: ["", Validators.required, Validators.minLength(2)],
    description: ["", [Validators.required, Validators.minLength(2)]],
    author: ["", [Validators.minLength(2), authorValidator(2)]],
    authors: this.fb.array([]),
    courseAuthors: this.fb.array([]),
    duration: ["", [Validators.required, Validators.min(0)]]
  });
  submitted = false;

  createAuthor() {
    if (this.courseForm.controls.authors.valid) {
      this.courseForm.controls.authors.push(this.fb.control(this.courseForm.controls.author.value));
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

}
