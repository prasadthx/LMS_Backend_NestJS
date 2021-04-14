import {Injectable, UnprocessableEntityException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SuperuserRefreshTokenRepository} from "../repositories/superuser.refreshtoken.repository";
import {SuperUserRepository} from "../repositories/superuser.repository";
import {JwtService} from "@nestjs/jwt";
import {SuperUser} from "../models/authRoles/superuser.entity";
import {SuperUserRefreshToken} from "../models/authRoles/superUserRefreshtoken.entity";
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';

export interface RefreshTokenPayload {
    jti: number;
    sub: number
}

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(SuperuserRefreshTokenRepository)
        private superuserRefreshTokenRepository: SuperuserRefreshTokenRepository,
        @InjectRepository(SuperUserRepository)
        private superUserRepository : SuperUserRepository,
        private jwtService : JwtService
    ) {}

    generateSuperUserRefreshToken(superUser:SuperUser, expiry:number) : Promise<string>{
        return this.superuserRefreshTokenRepository.createSuperUserRefreshToken(superUser, expiry).then(
            (token:SuperUserRefreshToken) => {
                const options : SignOptions = {
                    expiresIn:expiry,
                    subject: String(superUser.id),
                    jwtid : String(token.id)
                }
                return this.jwtService.signAsync({}, options)
            }
        )
    }

    generateSuperUserAccessToken( superUser: SuperUser) : Promise<string>{
        const options : SignOptions = {
            subject: String(superUser.id),
        }
        return this.jwtService.signAsync({}, options)
    }

    decodeSuperUserRefreshToken( refreshToken: string) : Promise<RefreshTokenPayload>{
        return this.jwtService.verifyAsync(refreshToken).catch(
            (error) => {
                if (error instanceof  TokenExpiredError) {
                    throw new UnprocessableEntityException('Refresh token expired');
                }
                else {
                    throw new UnprocessableEntityException('Refresh token malformed');
                }
            }
        )
    }

    getSuperUserFromPayload(payload:RefreshTokenPayload) : Promise<SuperUser> {
        const subId = payload.sub;
        if (!subId){
            throw new UnprocessableEntityException('Refresh token malformed');
        }
        return this.superUserRepository.findOne(subId);
    }

    getStoredTokenFromRefreshTokenPayload(payload:RefreshTokenPayload){
        const tokenId = payload.jti
        if(!tokenId){
            throw new UnprocessableEntityException('Refresh token malformed');
        }
        return this.superuserRefreshTokenRepository.findOne(tokenId);
    }

    resolveRefreshToken( encodedString:string ){
        return this.decodeSuperUserRefreshToken(encodedString).then(
            (payload) => {
                return this.getStoredTokenFromRefreshTokenPayload(payload).then(
                    (token) => {
                        if(!token){
                            throw new UnprocessableEntityException('Refresh token not found');
                        }
                        if(token.isRevoked){
                            throw new UnprocessableEntityException('Refresh token revoked');
                        }
                        return this.getSuperUserFromPayload(payload).then(
                            (user) => {
                                if(!user){
                                    throw new UnprocessableEntityException('Refresh token malformed');
                                }
                                return {
                                    user,
                                    token
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    createSuperUserAccessTokenFromRefreshToken( refresh : string){
        return this.resolveRefreshToken(refresh).then(
            (payload) => {
                return this.generateSuperUserAccessToken(payload.user).then(
                    (token) => {
                        return {
                            user: payload.user,
                            token
                        }
                })
            }
        )
    }
}