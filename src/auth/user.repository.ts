import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as Bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
        const {username, password} = authCredentialsDto;
        const user = new User();

        user.username = username;
        return Bcrypt.genSalt().then(
            (salt) => {
                user.salt = salt;
                this.hashPassword(password, salt).then(
                    (hashedPassword) => {
                        user.password = hashedPassword;
                        user.save().then(
                            (user) => {
                                console.log(user);
                            }).catch( (error) => {
                            if(error.code === '23505'){
                                throw new ConflictException("Username already exists");
                            }
                            else {
                                throw new InternalServerErrorException(error);
                            }
                        })
                    }
                )
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