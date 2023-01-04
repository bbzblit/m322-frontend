import { createAction, props } from "@ngrx/store";
import { Message } from "../model/exception.model";

export const addError = createAction(
    '[API] got an http ErrorCode :(',
    props<Message>()
)

export const deleteFirstError = createAction(
    '[Collection] removing first acction'
)
export const addSuccess = createAction(
    '[API] got an success from api :)',
    props<Message>()
)