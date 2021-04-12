import {EntityRepository, Repository} from "typeorm";
import {Admin} from "../models/admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

}