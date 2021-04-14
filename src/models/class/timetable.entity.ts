import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Exam extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    timetable: {};

    @Column()
    className : string;
}