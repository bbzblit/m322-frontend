import { createReducer, on } from "@ngrx/store";
import { Folder } from "../model/folder.model";
import { createFolderSuccess, deleteFolderSuccess, loadFolderSuccess } from "./folder.action";

const INITIAL_STATE : Array<Folder> = [];

export const folderReducer = createReducer(
    INITIAL_STATE,
    on(loadFolderSuccess, (state, {folders}) => state = folders),
    on(deleteFolderSuccess, (state, {folderId}) => state.filter(value => value.id !== folderId)),
    on(createFolderSuccess, (state, folder) => state.concat(folder)),
);
  