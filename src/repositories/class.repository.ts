import {EntityRepository, Repository} from "typeorm";
import {Class} from "../models/class/class.entity";

@EntityRepository(Class)
export class ClassRepository extends Repository<Class>{

}