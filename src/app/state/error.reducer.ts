import { state } from "@angular/animations";
import { Router } from "@angular/router";
import { createReducer, on } from "@ngrx/store";
import { Exception } from "../model/exception.model";
import { addError, deleteFirstError } from "./error.action";
import { createFolderSuccess, deleteFolderSuccess, loadFolderSuccess, updateFolderSuccess } from "./folder.action";

const INITIAL_STATE: Array<Exception> = [];

export const errorReducer = createReducer(
    INITIAL_STATE,
    on(addError, (state, error) => {
        let concatVar = [error];
        state.forEach(_error => { if (error.message === _error.message) { concatVar = [] } });
        return state.concat(concatVar);
    }),
    on(deleteFirstError, (state) => { state = [...state]; state.shift(); return state }),
);
