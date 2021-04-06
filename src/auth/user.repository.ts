import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import {BadRequestException, ConflictException, InternalServerErrorException, NotFoundException} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void>{
        const {username, password} = authCredentialsDto;
        const user = new User();

        user.username = username;
        user.password = password;

        return user.save().then(
            (user) => {
                console.log(user);
            }
        ).catch( (error) => {
            if(error.code === '23505'){
                throw new ConflictException("Username already exists");
            }
            else {
                throw new InternalServerErrorException(error);
            }
        })
    }
}