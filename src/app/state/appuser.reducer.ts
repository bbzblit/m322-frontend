import { createReducer, on } from "@ngrx/store";
import { clearAppUserCach, loginSuccess, registerSuccess } from "./appuser.action";

const INITIAL_STATE = {};

export const appUserReducer = createReducer(
    INITIAL_STATE,
    on(registerSuccess, (state, appUser) => state = appUser),
    on(loginSuccess, (state, appUser) => state = appUser),
    on(clearAppUserCach, (state) => state = INITIAL_STATE),
);
  