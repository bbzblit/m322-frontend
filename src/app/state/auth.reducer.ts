import { createReducer, on } from "@ngrx/store";
import { clearAppUserCach, loginSuccess, registerSuccess } from "./auth.action";

const INITIAL_STATE = {};

export const authReducer = createReducer(
    INITIAL_STATE,
    on(registerSuccess, (state, appUser) => state = appUser),
    on(loginSuccess, (state, appUser) => state = appUser),
    on(clearAppUserCach, (state) => state = INITIAL_STATE),
);
  