import { Grade } from "./grade.model";

export interface SubjectModel{
    id? : string,
    name? : string,
    grades? : Array<Grade>,
}