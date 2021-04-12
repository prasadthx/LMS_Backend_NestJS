import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

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
}