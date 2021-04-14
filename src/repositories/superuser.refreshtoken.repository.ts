import {EntityRepository, Repository} from "typeorm";
import {SuperUserRefreshToken} from "../models/authRoles/superUserRefreshtoken.entity";
import {SuperUser} from '../models/authRoles/superUser.entity';

@EntityRepository(SuperUserRefreshToken)
export class SuperuserRefreshTokenRepository extends Repository<SuperUserRefreshToken>{
    createSuperUserRefreshToken(user: SuperUser, expiresIn:number) : Promise<SuperUserRefreshToken>{
        const Token = new SuperUserRefreshToken;
        Token.superuser = user;
        Token.isRevoked = false;
        const expiry = new Date();
        expiry.setTime(expiry.getTime() + expiresIn);
        Token.expiresIn = expiry;
        return Token.save().then(
            (token) => {
                return token
            }
        ).catch( (error) => {
                return null;
            }
        );
    }

    findTokenById(id: number): Promise<SuperUserRefreshToken>{
        return this.findOne(id).then(
            (superUserRefreshToken) => {
                return superUserRefreshToken;
            }
        ).catch(
            (error) => {
                return null
            }
            )
    }
}
