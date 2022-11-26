import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppUser } from "../model/appuser.model";

export const selectAppUser = createFeatureSelector<AppUser>("appUser");

