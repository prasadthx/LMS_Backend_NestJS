import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Class} from "../class/class.entity";

@Entity()
@Unique(['username', 'rollNo'])
export class Student extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    rollNo : string;

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

    @Column()
    dateOfBirth : string;

    @ManyToOne(() => Class, className => className.students)
    className: Class[];
}