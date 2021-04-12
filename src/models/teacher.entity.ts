import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

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

}