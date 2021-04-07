import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as Bcrypt from 'bcrypt';
import {SampleEntity} from "../sample/sample/sample.entity";
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

    @OneToMany(type => SampleEntity, task => task.user, {eager:true})
    samples: SampleEntity[];

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