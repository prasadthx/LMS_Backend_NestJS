import { Module } from '@nestjs/common';
import { SampleController } from './sample/sample.controller';
import { SampleService } from './sample/sample.service';

@Module({
  controllers: [SampleController],
  providers: [SampleService]
})
export class SampleModule {}
