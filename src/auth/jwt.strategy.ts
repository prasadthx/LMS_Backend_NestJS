import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayload} from "./jwt.payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import { SuperUserRepository} from "../repositories/superuser.repository";
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(SuperUserRepository)
        private superUserRepository: SuperUserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'purasado',
        });
    }

    validate(payload:JwtPayload){
        const { sub:id } = payload;
        return this.superUserRepository.findOne(id).then(
            (user) => {
                if (!user){
                   throw new UnauthorizedException();
                }
                return user;
            }
        )
    }
}