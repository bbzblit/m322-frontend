import { createReducer, on } from "@ngrx/store";
import { AppUser } from "../model/appuser.model";
import { loadAppUserSuccess } from "./appUser.action";
import { clearAppUserCach, loginSuccess, registerSuccess } from "./auth.action";

const INITIAL_STATE : Array<AppUser> = [];

export const appUserReducer = createReducer(
    INITIAL_STATE,
    on(loadAppUserSuccess, (state, appUser) => state.concat([appUser])),
);
  