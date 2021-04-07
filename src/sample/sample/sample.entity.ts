import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ModelStatus} from "./sample.model";
import {User} from "../../auth/user.entity";

@Entity()
export class SampleEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    status: ModelStatus;

    @ManyToOne(type => User, user => user.samples, {eager:false})
    user: User;

    @Column()
    userId : number;
}