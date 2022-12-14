import { AppUser } from "./appuser.model";
import { SubjectModel } from "./subject.model";

export interface Folder{
    id?: string,
    title? : string,
    owner? : AppUser,
    viewAccess? : Array<AppUser>,
    writeAccess? : Array<AppUser>,
    subjects? : Array<SubjectModel>,
}