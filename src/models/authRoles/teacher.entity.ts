import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Class} from "../class/class.entity";

@Entity()
@Unique(['username'])
export class Teacher extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username: string;

    @Column()
    FirstName : string;

    @Column()
    LastName : string;

    @Column()
    Email : string;

    @Column()
    password:string;

    @Column()
    salt:string;

    @OneToOne( () => Class, className => className.classTeacher)
    @JoinColumn()
    classTeacher:Class;

}