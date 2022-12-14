import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Folder } from "../model/folder.model";

export const selectFolder = createFeatureSelector<Array<Folder>>("folder");

export const selectFolderById = (props: { folderId: string }) => 
  createSelector(
    selectFolder,
    (folder : Array<Folder>) => folder.find(folder => folder.id === props.folderId)
);
