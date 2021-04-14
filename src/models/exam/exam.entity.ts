import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "../class/subject.entity";
import {Class} from "../class/class.entity";

@Entity()
export class Exam extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    examName: string;

    @OneToOne( () => Subject)
    @JoinColumn()
    subject : Subject;

    @ManyToOne( () => Class)
    @JoinColumn()
    className : Class;

    @Column()
    startTime : string;

    @Column()
    endTime : string;
}