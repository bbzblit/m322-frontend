import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppUser } from "../model/appuser.model";

export const selectAuthUser = createFeatureSelector<AppUser>("authUser");

