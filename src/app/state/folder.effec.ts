import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { Exception } from "../model/exception.model";
import { Folder } from "../model/folder.model";
import { FolderService } from "../service/folder.service";
import { addError } from "./error.action";
import { createFolder, createFolderSuccess, deleteFolderSuccess, deletFolder, loadFolders, loadFolderSuccess, updateFolder, updateFolderSuccess } from "./folder.action";

@Injectable()
export class FolderEffect {

    constructor(private actions$: Actions, private folderService: FolderService) { }

    loadFolders$ = createEffect(() => this.actions$.pipe(
        ofType(loadFolders),
        switchMap(() =>
            this.folderService.loadAllFolder().pipe(
                map((folders: Array<Folder>) => loadFolderSuccess({ folders: folders })),
                catchError(error => of(addError(error.error as Exception)))
            )
        )
    ))

    deletFolder$ = createEffect(() => this.actions$.pipe(
        ofType(deletFolder),
        switchMap(({ folderId }) =>
            this.folderService.deleteFolder(folderId).pipe(
                map(() => deleteFolderSuccess({ folderId: folderId })),
                catchError(error => of(addError(error.error as Exception)))
            )
        )
    ))

    createFolder$ = createEffect(() => this.actions$.pipe(
        ofType(createFolder),
        switchMap((folder) =>
            this.folderService.createFolder(folder).pipe(
                map((folder) => createFolderSuccess(folder)),
                catchError(error => of(addError(error.error as Exception)))
            )
        )
    ))

    updateFolder$ = createEffect(() => this.actions$.pipe(
        ofType(updateFolder),
        switchMap((folder) =>
            this.folderService.updateFolder(folder).pipe(
                map((folder) => updateFolderSuccess(folder)),
                catchError(error => of(addError(error.error as Exception)))
            )
        )
    ))
}