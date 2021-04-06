import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as Bcrypt from 'bcrypt';
@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @Column()
    salt:string;

    validatePassword(password:string): Promise<boolean>{
        return Bcrypt.hash(password, this.salt).then(
            (hash) => {
                if (hash===this.password){
                    return true;
                }
                else return false;
            }
        )
    }
}