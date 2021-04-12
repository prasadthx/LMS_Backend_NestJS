import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Admin extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

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