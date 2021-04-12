import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class SuperUser extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column()
    FirstName : string;

    @Column()
    LastName : string;
}