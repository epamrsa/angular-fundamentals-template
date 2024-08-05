import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

export interface Course {
    "title": string,
    "description": string,
    "duration": number,
    "authors": string[]
}

export interface ECourse extends Course {
    "id": string,
    "creationDate": string
}

export interface Author {
    "id": string,
    "name": string
}

interface CommonResponse {
    successful: boolean
}

interface CoursesResponse extends CommonResponse {
    result: ECourse[]
}

interface CourseResponse extends CommonResponse {
    result: ECourse
}

interface AuthorsResponse extends CommonResponse {
    result: Author[]
}

interface AuthorResponse extends CommonResponse {
    result: Author
}

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(
        private httpClient: HttpClient
    ) {}

    getAll() {
        return this.httpClient.get<CoursesResponse>("http://localhost:4000/courses/all").pipe(
            map(event => event.result)
        );
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.httpClient.post<CourseResponse>("http://localhost:4000/courses/add", course).pipe(
            map(event => event.successful)
        );
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        return this.httpClient.put<CourseResponse>(`http://localhost:4000/courses/${id}`, course).pipe(
            map(event => event.successful)
        );
    }

    getCourse(id: string) {
        return this.httpClient.get<CourseResponse>(`http://localhost:4000/courses/${id}`).pipe(
            map(event => event.result)
        );
    }

    deleteCourse(id: string) {
        return this.httpClient.delete<CommonResponse>(`http://localhost:4000/courses/${id}`).pipe(
            map(event => event.successful)
        );
    }

    filterCourses(value: string) {
        return this.httpClient.get<CoursesResponse>(`http://localhost:4000/courses/filter?${value}`).pipe(
            map(event => event.result)
        );
    }

    getAllAuthors() {
        return this.httpClient.get<AuthorsResponse>("http://localhost:4000/authors/all").pipe(
            map(event => event.result)
        );
    }

    createAuthor(name: string) {
        return this.httpClient.post<AuthorResponse>("http://localhost:4000/authors/add", name).pipe(
            map(event => event.successful)
        );
    }

    getAuthorById(id: string) {
        return this.httpClient.post<AuthorResponse>(`http://localhost:4000/authors/${id}`, id).pipe(
            map(event => event.result)
        );
    }

}
