import { createAction, props } from "@ngrx/store";
import { Exception } from "../model/exception.model";

export const addError = createAction(
    '[API] got an http ErrorCode :(',
    props<Exception>()
)

export const deleteFirstError = createAction(
    '[Collection] removing first acction'
)