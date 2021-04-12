import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {SuperUserRepository} from "../repositories/superuser.repository";

@Module({
  imports:[
      PassportModule.register({defaultStrategy:'jwt'}),
      JwtModule.register(
          {
              secret:'purasado',
              signOptions:{
                  expiresIn:3600,
              }
          }
      ),
      TypeOrmModule.forFeature([UserRepository, SuperUserRepository]),
  ],
  controllers: [AuthController],
  providers: [
      AuthService,
      JwtStrategy
  ],
    exports:[
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
