import { createReducer, on } from "@ngrx/store";
import { registerSuccess } from "./appuser.action";

const INITIAL_STATE = {};

export const appUserReducer = createReducer(
    INITIAL_STATE,
    on(registerSuccess, (state, appUser) => state = appUser)
    );
  