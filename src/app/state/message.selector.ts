import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Message } from "../model/exception.model";

export const selectMessage = createFeatureSelector<Array<Message>>("message");

