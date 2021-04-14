import {Body, Controller, Post, Req, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthCredentialsDto} from "./dto/auth.credentials.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "./get.user.decorator";
import {User} from "./user.entity";
import {AuthCredentialsDto as ACD} from '../models/authCredentialsDto';
import {TokenService} from "./token.service";
import {SuperUser} from '../models/authRoles/superuser.entity';

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
        private tokenService: TokenService
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
        return this.authService.superUserLogin(authCredentialsDto);
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

