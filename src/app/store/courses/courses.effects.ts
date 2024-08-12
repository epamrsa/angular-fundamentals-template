import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { requestAllCourses, requestAllCoursesSuccess, requestAllCoursesFail, requestFilteredCourses, requestFilteredCoursesSuccess, requestFilteredCoursesFail, requestSingleCourse, requestSingleCourseSuccess, requestSingleCourseFail, requestDeleteCourse, requestDeleteCourseSuccess, requestDeleteCourseFail, requestEditCourse, requestEditCourseSuccess, requestEditCourseFail, requestCreateCourse, requestCreateCourseSuccess, requestCreateCourseFail } from "@app/store/courses/courses.actions";
import { CoursesService } from "@app/services/courses.service";
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router
    ) {}

    // Add your code here
    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(requestAllCourses),
        mergeMap(() => this.coursesService.getAll().pipe(
            map(courses => requestAllCoursesSuccess({ courses: courses })),
            catchError(error => of(requestAllCoursesFail({ error: error })))
        ))
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(requestFilteredCourses),
        mergeMap(event => this.coursesService.filterCourses(event.title).pipe(
            map(courses => requestFilteredCoursesSuccess({ courses: courses })),
            catchError(error => of(requestFilteredCoursesFail({ error: error })))
        ))
    ));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestSingleCourse),
        mergeMap(event => this.coursesService.getCourse(event.id).pipe(
            map(course => requestSingleCourseSuccess({ course: course })),
            catchError(error => of(requestSingleCourseFail({ error: error })))
        ))
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestDeleteCourse),
        mergeMap(event => this.coursesService.deleteCourse(event.id).pipe(
            map(event => requestDeleteCourseSuccess({ id: event })),
            catchError(error => of(requestDeleteCourseFail({ error: error })))
        ))
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestEditCourse),
        mergeMap(event => this.coursesService.editCourse(event.id, event.course).pipe(
            map(course => requestEditCourseSuccess({ course: course})),
            catchError(error => of(requestEditCourseFail({ error: error })))
        ))
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestCreateCourse),
        mergeMap(event => this.coursesService.createCourse(event.course).pipe(
            map(course => requestCreateCourseSuccess({ course: course })),
            catchError(error => of(requestCreateCourseFail({ error: error })))
        ))
    ));

    redirectToTheCoursesPage$ = createEffect(
        () => this.actions$.pipe(
            ofType(requestCreateCourseSuccess, requestEditCourseSuccess, requestSingleCourseFail),
            tap(() => this.router.navigateByUrl("/courses"))
        ),
        { dispatch: false }
    );

}
