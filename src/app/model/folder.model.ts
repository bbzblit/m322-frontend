import { AppUser } from "./appuser.model";
import { Subject } from "./subject.model";

export interface Folder{
    id: string,
    title : string,
    owner : AppUser,
    viewAccess : Array<AppUser>,
    writeAccess : Array<AppUser>,
    subjects : Array<Subject>,
}