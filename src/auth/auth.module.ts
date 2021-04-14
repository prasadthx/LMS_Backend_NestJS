import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {SuperUserRepository} from "../repositories/superuser.repository";
import {ExamRepository} from "../repositories/exam.repository";
import {TeacherRepository} from "../repositories/teacher.repository";
import {ClassRepository} from "../repositories/class.repository";
import {StudentRepository} from "../repositories/student.repository";
import {SubjectRepository} from "../repositories/subject.repository";
import {SuperuserRefreshTokenRepository} from "../repositories/superuser.refreshtoken.repository";
import {TokenService} from "./token.service";


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
      TypeOrmModule.forFeature([UserRepository, SuperUserRepository, TeacherRepository, StudentRepository, SubjectRepository,ClassRepository, ExamRepository, SuperuserRefreshTokenRepository]),
  ],
  controllers: [AuthController],
  providers: [
      AuthService,
      TokenService,
      JwtStrategy
  ],
    exports:[
        JwtStrategy,
        PassportModule
    ]
})
export class AuthModule {}
