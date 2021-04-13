import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeorm.config";
import { AuthModule } from './auth/auth.module';
import { NewRegistrationModule } from './new-registration/new-registration.module';

@Module({
  imports: [SampleModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule, NewRegistrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
