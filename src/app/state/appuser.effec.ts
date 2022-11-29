import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { AppUser } from "../model/appuser.model";
import { Folder } from "../model/folder.model";
import { AppuserService } from "../service/appuser.service";
import { FolderService } from "../service/folder.service";
import { registerSuccess } from "./appuser.action";
import { loadFolders, loadFolderSuccess } from "./folder.action";

@Injectable()
export class FolderEffect {

    constructor(private actions$: Actions, private folderService : FolderService) {}

    loadFolders$ = createEffect(() => this.actions$.pipe(
        ofType(loadFolders),
        switchMap(() =>
            this.folderService.loadAllFolder().pipe(
                map((folders: Array<Folder>) => loadFolderSuccess({folders : folders })),
                //catchError(error => console.log(error))) //TODO: Replace with exeption handeling
            )
        )
    ))
}