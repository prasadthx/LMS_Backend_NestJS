import {EntityRepository, Repository} from "typeorm";
import {Student} from "../models/authRoles/student.entity";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student>{

}