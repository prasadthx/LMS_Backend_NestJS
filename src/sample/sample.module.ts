import { Module } from '@nestjs/common';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SampleRepository} from "./sample/sample.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[
      TypeOrmModule.forFeature([SampleRepository]),
      AuthModule
  ],
  controllers: [SampleController],
  providers: [SampleService]
})
export class SampleModule {}
