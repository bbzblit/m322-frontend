import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Folder } from "../model/folder.model";

export const selectFolder = createFeatureSelector<Array<Folder>>("folder");

