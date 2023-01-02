import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppUser } from "../model/appuser.model";

export const selectAppUser = createFeatureSelector<Array<AppUser>>("appUser");

export const selectAppUserById = (props: { appUserId: string }) => 
  createSelector(
    selectAppUser,
    (appUsers : Array<AppUser>) => appUsers.find(appUser => appUser.id === props.appUserId)
);
