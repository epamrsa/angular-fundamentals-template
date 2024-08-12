import { Injectable } from '@angular/core';
import { State } from "@app/store/courses/courses.reducer";
import { Store } from "@ngrx/store";
import {
    getAllCourses, getCourse,
    getCourses, getErrorMessage,
    isAllCoursesLoadingSelector,
    isSearchingStateSelector,
    isSingleCourseLoadingSelector
} from "@app/store/courses/courses.selectors";
import { ECourse } from "@app/services/courses.service";
import {
    requestAllCourses, requestCreateCourse, requestDeleteCourse,
    requestEditCourse,
    requestFilteredCourses,
    requestSingleCourse
} from "@app/store/courses/courses.actions";

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here
    public isAllCoursesLoading$ = this.store.select(isAllCoursesLoadingSelector);
    public isSingleCourseLoading$ = this.store.select(isSingleCourseLoadingSelector);
    public isSearchingState$ = this.store.select(isSearchingStateSelector);
    public courses$ = this.store.select(getCourses);
    public allCourses$ = this.store.select(getAllCourses);
    public course$ = this.store.select(getCourse);
    public errorMessage$ = this.store.select(getErrorMessage);

    constructor(private store: Store<State>) {
    }

    public getAllCourses() {
        this.store.dispatch(requestAllCourses());
    }

    public getSingleCourse(id: string) {
        this.store.dispatch(requestSingleCourse({ id: id }));
    }

    public getFilteredCourses(title: string) {
        this.store.dispatch(requestFilteredCourses({ title: title }));
    }

    public editCourse(id: string, course: ECourse) {
        this.store.dispatch(requestEditCourse({ id: id, course: course }));
    }

    public createCourse(course: ECourse) {
        this.store.dispatch(requestCreateCourse({ course: course }));
    }

    public deleteCourse(id: string) {
        this.store.dispatch(requestDeleteCourse({ id: id }));
    }

}
