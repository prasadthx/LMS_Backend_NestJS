import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(8)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message:'PASSWORD TOO WEAK'})
    password:string;

    @IsString()
    @IsEmail()
    email:string;
}

export class RefreshTokenRequest {
    @IsNotEmpty({message: 'The refresh token is required'})
    refreshToken:string;
}