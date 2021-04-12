import {EntityRepository, Repository} from "typeorm";
import {SuperUser} from "../models/superuser.entity";
import {AuthCredentialsDto} from "../models/authCredentialsDto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import * as Bcrypt from 'bcrypt';

@EntityRepository(SuperUser)
export class SuperUserRepository extends Repository<SuperUser>{
    signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
        const {username, email, password} = authCredentialsDto;
        const user = new SuperUser();

        return this.findOne(1).then(
            (existingSuperUser) => {
                if (existingSuperUser) {
                    throw new ConflictException('Only One SuperUser can exist');
                } else {
                    user.username = username;
                    user.email = email;
                    return Bcrypt.genSalt().then(
                        (salt) => {
                            user.salt = salt;
                            this.hashPassword(password, salt).then(
                                (hashedPassword) => {
                                    user.password = hashedPassword;
                                    user.save().then(
                                        (user) => {
                                            console.log(user);
                                        }).catch((error) => {
                                        if (error.code === '23505') {
                                            throw new ConflictException("Username already exists");
                                        } else {
                                            throw new InternalServerErrorException(error);
                                        }
                                    })
                                }
                            )
                        }
                    )
                }
            }
        )
    }

    validateUserPassword(authCredentialsDto:AuthCredentialsDto):Promise<string>{
        const {username, password} = authCredentialsDto;
        return this.findOne({username}).then(
            (user) => {
                if (user){
                    return user.validatePassword(password).then(
                        (result) => {
                            if(result === true){
                                return username;
                            }
                            else
                                return null;
                        }
                    )
                }
                else
                    return null;
            }
        )
    }

    private async hashPassword(password:string, salt:string) : Promise<string>{
        return Bcrypt.hash(password, salt)
    }
}