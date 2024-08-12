// Add your code here
import { coursesFeatureKey, CoursesState, State } from "@app/store/courses/courses.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const coursesState = createFeatureSelector<State, CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
    coursesState,
    (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    coursesState,
    (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    coursesState,
    (state: CoursesState) => state.isSingleCourseLoading
);

export const getCourses = createSelector(
    coursesState,
    (state: CoursesState) => state.allCourses
);

export const getAllCourses = createSelector(
    coursesState,
    (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
    coursesState,
    (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
    coursesState,
    (state: CoursesState) => state.errorMessage
);
