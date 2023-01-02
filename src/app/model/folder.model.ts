import { AppUser } from "./appuser.model";
import { SubjectModel } from "./subject.model";

export interface Folder{
    id?: string,
    title? : string,
    owner? : AppUser,
    viewAccess? : Array<string>,
    writeAccess? : Array<string>,
    subjects? : Array<SubjectModel>,
}