import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Subject extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    subjectName:string;
}