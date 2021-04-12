import {EntityRepository, Repository} from "typeorm";
import {Student} from "../models/student.entity";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student>{

}