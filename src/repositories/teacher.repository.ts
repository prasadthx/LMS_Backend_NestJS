import {EntityRepository, Repository} from "typeorm";
import {Teacher} from "../models/teacher.entity";

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher>{

}