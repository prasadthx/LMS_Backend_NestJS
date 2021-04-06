import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ModelStatus} from "./sample.model";

@Entity()
export class SampleEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    status: ModelStatus;
}