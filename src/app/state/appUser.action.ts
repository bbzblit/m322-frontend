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