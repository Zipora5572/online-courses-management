import { Lesson } from "./lesson.model";

export class Course{
    
    constructor(
    public id :number=0,
    public title : string,
    public description:string,
    public teacherId : number, 
    public lessons: Lesson[] 
    ){
     }
}