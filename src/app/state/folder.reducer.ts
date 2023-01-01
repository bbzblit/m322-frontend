import { createReducer, on } from "@ngrx/store";
import { Folder } from "../model/folder.model";
import { createFolderSuccess, deleteFolderSuccess, loadFolderSuccess, updateFolderSuccess } from "./folder.action";
import { addGradeSuccess } from "./grade.action";

const INITIAL_STATE: Array<Folder> = [];

export const folderReducer = createReducer(
    INITIAL_STATE,
    on(loadFolderSuccess, (state, { folders }) => state = folders),
    on(deleteFolderSuccess, (state, { folderId }) => state.filter(value => value.id !== folderId)),
    on(createFolderSuccess, (state, folder) => state.concat(folder)),
    on(updateFolderSuccess, (state, folder) => state.map(_folder => { if (folder.id === _folder.id) { return folder; } else { return _folder; } })),
    on(addGradeSuccess, (state, subject) => state.map(folder => {folder = {...folder};folder.subjects = folder.subjects?.map(_subject => { if (_subject.id == subject.id) {console.log(subject);return subject}; return _subject }); return folder}))

);