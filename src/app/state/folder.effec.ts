import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, mergeMap } from "rxjs";
import { Message } from "../model/exception.model";
import { Folder } from "../model/folder.model";
import { FolderService } from "../service/folder.service";
import { addError } from "./message.action";
import { createFolder, createFolderSuccess, deleteFolderSuccess, deletFolder, loadFolders, loadFolderSuccess, updateFolder, updateFolderSuccess } from "./folder.action";

@Injectable()
export class FolderEffect {

    constructor(private actions$: Actions, private folderService: FolderService) { }

    loadFolders$ = createEffect(() => this.actions$.pipe(
        ofType(loadFolders),
        mergeMap(() =>
            this.folderService.loadAllFolder().pipe(
                map((folders: Array<Folder>) => loadFolderSuccess({ folders: folders })),
                catchError(error => of(addError(error.error as Message)))
            )
        )
    ))

    deletFolder$ = createEffect(() => this.actions$.pipe(
        ofType(deletFolder),
        mergeMap(({ folderId }) =>
            this.folderService.deleteFolder(folderId).pipe(
                map(() => deleteFolderSuccess({ folderId: folderId })),
                catchError(error => of(addError(error.error as Message)))
            )
        )
    ))

    createFolder$ = createEffect(() => this.actions$.pipe(
        ofType(createFolder),
        mergeMap((folder) =>
            this.folderService.createFolder(folder).pipe(
                map((folder) => createFolderSuccess(folder)),
                catchError(error => of(addError(error.error as Message)))
            )
        )
    ))

    updateFolder$ = createEffect(() => this.actions$.pipe(
        ofType(updateFolder),
        mergeMap((folder) =>
            this.folderService.updateFolder(folder).pipe(
                map((folder) => updateFolderSuccess(folder)),
                catchError(error => of(addError(error.error as Message)))
            )
        )
    ))
}