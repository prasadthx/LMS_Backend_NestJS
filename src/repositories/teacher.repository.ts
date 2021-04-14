import {EntityRepository, Repository} from "typeorm";
import {Teacher} from "../models/authRoles/teacher.entity";

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher>{

}