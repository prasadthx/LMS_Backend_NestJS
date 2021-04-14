import {Body, Controller, Get, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get.user.decorator";
import {User} from "./user.entity";
import {AuthCredentialsDto as ACD, RefreshTokenRequest} from '../models/authCredentialsDto';
import {TokenService} from "./token.service";
import {SuperUser} from '../models/authRoles/superuser.entity';
import {JWTGuard} from "./jwt.guard";
import {InjectRepository} from "@nestjs/typeorm";
import {SuperUserRepository} from "../repositories/superuser.repository";

export interface AuthenticationPayload {
    user: SuperUser
    payload: {
        type: string
        token: string
        refresh_token?: string
    }
}

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        @InjectRepository(SuperUserRepository)
        private superUserRepository: SuperUserRepository
    ) {
    }

    // @Post('signup')
    // signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto) : Promise<void> {
    //     return this.authService.signUp(authCredentialsDto);
    // }
    //
    // @Post('signin')
    // signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto){
    //     return this.authService.signIn(authCredentialsDto);
    // }
    //
    // @Post('test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User){
    //     console.log(user);
    // }

    @Post('/superuser/signup')
    superuserSign(@Body(ValidationPipe) authCredentialsDto: ACD) {
        return this.authService.superUserSign(authCredentialsDto).then(
            (superUser) => {
               return this.tokenService.generateSuperUserAccessToken(superUser).then(
                    (accessToken) => {
                        return this.tokenService.generateSuperUserRefreshToken(superUser, 60 * 60 * 24 * 30).then(
                            (refreshToken) => {
                                const payload = this.buildResponsePayload(superUser, accessToken, refreshToken)
                                return {
                                    status : 'success',
                                    data: payload
                                }
                            }
                        )
                    }
                )
            }
        )
    }

    @Post('/superuser/login')
    superUserLogin(@Body(ValidationPipe) authCredentialsDto: ACD) {
        return this.authService.superUserLogin(authCredentialsDto).then(
            (user) => {
                return this.tokenService.generateSuperUserAccessToken(user).then(
                    (accessToken) => {
                        return this.tokenService.generateSuperUserRefreshToken(user, 60 * 60 * 24* 30).then(
                            (refreshToken) => {
                                const payload = this.buildResponsePayload(user, accessToken, refreshToken)
                                return {
                                    status : 'success',
                                    data: payload
                                }
                            }
                        )
                    }
                )
            }
        );
    }

    @Post('/refresh')
    refreshToken(@Body() body:RefreshTokenRequest) {
        return this.tokenService.createSuperUserAccessTokenFromRefreshToken(body.refreshToken).then(
            ({user, token}) => {
                const payload = this.buildResponsePayload(user, token)
                return {
                    status : 'success',
                    data: payload
                }
            }
        )
    }

    @Get('/me')
    @UseGuards(JWTGuard)
    getUser(@Req() request) {
        const userId = request.user.id;
        return this.superUserRepository.findOne(userId).then(
            (user) => {
                return {
                    status : 'success',
                    data: user
                }
            }
        )
    }



    buildResponsePayload(user: SuperUser, accessToken: string, refreshToken?: string): AuthenticationPayload {
        return {
            user: user,
            payload: {
                type: 'bearer',
                token: accessToken,
                ...(refreshToken ? {refresh_token: refreshToken} : {}),
            }
        }
    }

}

