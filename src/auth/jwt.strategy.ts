import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt.payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'purasado'
        });
    }

    validate(payload:JwtPayload){
        const { username } = payload;
        return this.userRepository.findOne({username}).then(
            (user) => {
                if (!user){
                   throw new UnauthorizedException();
                }
                return user;
            }
        )
    }
}