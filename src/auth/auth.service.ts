import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt.payload.interface";
import {AuthCredentialsDto as ACD} from '../models/authCredentialsDto';
import {SuperUserRepository} from "../repositories/superuser.repository";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        @InjectRepository(SuperUserRepository)
        private superUserRepository : SuperUserRepository,
        private jwtService: JwtService
    ) {}

    signUp(authCredentialsDto:AuthCredentialsDto) : Promise<void>{
        return this.userRepository.signUp(authCredentialsDto)
    }

    signIn(authCredentialsDto:AuthCredentialsDto){
        return this.userRepository.validateUserPassword(authCredentialsDto).then(
                (username) => {
                if(!username){
                    throw new UnauthorizedException('Invalid credentials');
                }
                console.log(username);
                const payload:JwtPayload = {username}
                return this.jwtService.sign(payload)
            }
        )
    }

    superuserSign(authCredentialsDto: ACD) {
        return this.superUserRepository.signUp(authCredentialsDto);
    }
}
