import {EntityRepository, Repository} from "typeorm";
import {Exam} from "../models/exam/exam.entity";

@EntityRepository(Exam)
export class ExamRepository extends Repository<Exam>{

}