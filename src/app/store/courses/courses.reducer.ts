import { Action, createReducer, on } from '@ngrx/store';
import { ECourse } from "@app/services/courses.service";
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestCreateCourse, requestCreateCourseFail, requestCreateCourseSuccess,
    requestDeleteCourse, requestDeleteCourseFail, requestDeleteCourseSuccess,
    requestEditCourse, requestEditCourseFail, requestEditCourseSuccess,
    requestFilteredCourses, requestFilteredCoursesFail,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess
} from "@app/store/courses/courses.actions";

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: ECourse[],
    course: ECourse | null,
    isAllCoursesLoading: boolean,
    isSingleCourseLoading: boolean,
    isSearchState: boolean,
    errorMessage: string | null
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null
};

export const coursesReducer = createReducer(
    // Add your code here
    initialState,

    on(requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true
    })),
    on(requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        isAllCoursesLoading: false,
        allCourses: courses,
        course: null
    })),
    on(requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    on(requestSingleCourse, (state, { id }) => ({
        ...state,
        isSingleCourseLoading: true
    })),
    on(requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        isSingleCourseLoading: false,
        allCourses: [],
        course: course
    })),
    on(requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),

    on(requestFilteredCourses, (state, { title }) => ({
        ...state,
        isSearchState: true
    })),
    on(requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        isSearchState: false,
        allCourses: courses,
        course: null
    })),
    on(requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        errorMessage: error
    })),

    on(requestDeleteCourse, (state, { id }) => ({
        ...state
    })),
    on(requestDeleteCourseSuccess, (state) => ({
        ...state,
        allCourses: [],
        course: null
    })),
    on(requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(requestEditCourse, (state, { id, course }) => ({
        ...state
    })),
    on(requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [],
        course: course
    })),
    on(requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(requestCreateCourse, (state, { course }) => ({
        ...state
    })),
    on(requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [],
        course: course
    })),
    on(requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
