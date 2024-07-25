import { Component } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators
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
  courseForm = new FormGroup({
    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
    title: new FormControl("", [Validators.required, Validators.minLength(2)]),
    description: new FormControl("", [Validators.required, Validators.minLength(2)]),
    author: new FormControl("", [Validators.minLength(2), authorValidator(2)]),
    duration: new FormControl(0),
  });
  submitted = false;

  courseDurationFormatted() {
    let duration = this.courseForm.controls.duration.value;
    if (duration == null) return "";
    if (duration < 60) return duration + " minutes";
    return Math.floor(duration / 60) + ":" + duration % 60 + " hours";
  }

}
