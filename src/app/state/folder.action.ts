import { createAction, props } from "@ngrx/store";
import { Folder } from "../model/folder.model";

export const loadFolders = createAction(
    '[API] Loading all folders'
);

export const loadFolderSuccess = createAction(
    '[Collection] load folder success',
    props<{folders : Array<Folder>}>()
);

export const deletFolder = createAction(
    '[API] delete folder now',
    props<{folderId : string}>()
);

export const deleteFolderSuccess = createAction(
    '[Collection] delete folder by id',
    props<{folderId : string}>()
)

export const createFolder = createAction(
    '[API] create Folder',
    props<Folder>()
)

export const createFolderSuccess = createAction(
    '[Collection] created Folder',
    props<Folder>()
)