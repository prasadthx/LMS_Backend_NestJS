import { Module } from '@nestjs/common';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SampleRepository} from "./sample/sample.repository";

@Module({
  imports:[TypeOrmModule.forFeature([SampleRepository])],
  controllers: [SampleController],
  providers: [SampleService]
})
export class SampleModule {}
