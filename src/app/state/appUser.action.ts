import { createAction, props } from "@ngrx/store";
import { AppUser } from "../model/appuser.model";

export const loadAppUser = createAction(
    '[Api] loading appuser',
    props<{emailOrUsername : string}>()
);

export const loadAppUserSuccess = createAction(
    '[Collection] loadet appuser success',
    props<AppUser>()
)

export const loadAppUsByUserId = createAction(
    '[API] loading appuser by userid',
    props<{userid : string}>()
)

export const sendResetLink = createAction(
    '[API] sending reset link',
    props<{email : string}>()
)

export const resetPassword = createAction(
    '[API] reseting Password',
    props<{otp : string | null, password : string | null}>()
)