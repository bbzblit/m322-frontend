import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Exception } from "../model/exception.model";

export const selectError = createFeatureSelector<Array<Exception>>("error");

