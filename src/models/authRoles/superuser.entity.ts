import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import * as Bcrypt from 'bcrypt';

@Entity()
export class SuperUser extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;

    @Column({nullable : true})
    FirstName : string;

    @Column({nullable : true})
    LastName : string;

    @Column()
    email : string;

    @Column()
    password:string;

    @Column()
    salt:string;

    validatePassword(password:string): Promise<boolean>{
        return Bcrypt.hash(password, this.salt).then(
            (hash) => {
                if (hash===this.password){
                    return true;
                }
                else return false;
            }
        )
    }
}