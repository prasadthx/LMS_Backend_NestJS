import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SuperUser} from "./superuser.entity";

@Entity()
export class SuperUserRefreshToken extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne( () => SuperUser)
    superuser: SuperUser

    @Column()
    isRevoked: boolean

    @Column()
    expiresIn: Date;
}