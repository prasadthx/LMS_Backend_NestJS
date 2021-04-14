import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Exam extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    assignmentName: string;

    @Column()
    subject : string;

    @Column()
    className : string;
}