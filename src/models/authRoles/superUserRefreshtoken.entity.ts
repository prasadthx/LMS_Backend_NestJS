import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SuperUser} from "./superuser.entity";

@Entity()
export class SuperUserRefreshToken extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne( () => SuperUser)
    @JoinColumn()
    superuser: SuperUser

    @Column()
    isRevoked: boolean

    @Column()
    expiresIn: Date;
}