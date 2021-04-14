import {EntityRepository, Repository} from "typeorm";
import {Subject} from "../models/class/subject.entity";


@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject>{

}