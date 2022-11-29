import { createAction, props } from "@ngrx/store";
import { Folder } from "../model/folder.model";

export const loadFolders = createAction(
    '[API] Loading all folders'
)

export const loadFolderSuccess = createAction(
    '[Collection] load folder success',
    props<{folders : Array<Folder>}>()
)