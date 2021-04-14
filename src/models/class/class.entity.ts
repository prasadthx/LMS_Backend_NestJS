import {BaseEntity, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, JoinTable} from "typeorm";
import {Student} from "../authRoles/student.entity";
import {Teacher} from "../authRoles/teacher.entity";
import {Subject} from "./subject.entity";
// import {JoinTable} from "typeorm/browser";

@Entity()
@Unique(['className'])
export class Class extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    className: string;

    @OneToOne( () => Teacher, teacher => teacher.classTeacher)
    classTeacher: Teacher;

    @ManyToMany( () => Subject)
    @JoinTable()
    subjects: Subject[];

    @OneToMany(() => Student, student => student.className)
    students: Student[];

}