import { Injectable } from '@angular/core';
import { Author, Course, CoursesService, ECourse } from "@app/services/courses.service";
import { BehaviorSubject, finalize } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    private isLoading$$ = new BehaviorSubject(true);
    private courses$$ = new BehaviorSubject<ECourse[]>([]);
    private authors$$ = new BehaviorSubject<Author[]>([]);
    public isLoading$ = this.isLoading$$.asObservable();
    public courses$ = this.courses$$.asObservable();
    public authors$ = this.authors$$.asObservable();

    constructor(
       private coursesService: CoursesService
    ) {}

    getAll(){
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAll()
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(event => this.courses$$.next(event));
    }

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe();
    }

    getCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(event => this.courses$$.next([event]));
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe();
    }

    deleteCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe();
    }

    filterCourses(value: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(event => this.courses$$.next(event))
    }

    getAllAuthors() {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors()
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(event => this.authors$$.next(event));
    }

    createAuthor(name: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.createAuthor(name)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe();
    }

    getAuthorById(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(event => this.authors$$.next([event]));
    }

}
