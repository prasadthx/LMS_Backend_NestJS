import {EntityRepository, Repository} from "typeorm";
import {Admin} from "../models/authRoles/admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

}