import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {SampleService} from "./sample.service";
import {ModelStatus, SampleModel} from "./sample.model";
import {CreateSampleDto} from "./dto/createSample-dto";
import {StatusValidationPipe} from "./pipes/status-validation";
import {SampleEntity} from "./sample.entity";
import {GetSampleFilterDto} from "./dto/getSampleFilter-dto";

@Controller('sample')
export class SampleController {
    constructor(private sampleService: SampleService) {
    }

    @Get()
    getSample(@Query() getSampleFilterDto : GetSampleFilterDto){
        return this.sampleService.getAllSamples();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSample(@Body() createSampleDto: CreateSampleDto){
        return this.sampleService.createSample(createSampleDto);
    }
    //
    @Get(':id')
    getSampleById(@Param('id', ParseIntPipe) id:number): Promise<SampleEntity>{
        return this.sampleService.getSampleById(id);
    }

    @Delete(':id')
    deleteSample(@Param('id', ParseIntPipe) id:number){
        return this.sampleService.deleteSample(id);
    }

    @Patch(':id')
    updateSample(@Body('status', StatusValidationPipe) status: ModelStatus, @Param ('id', ParseIntPipe) id:number) : Promise<SampleEntity>{
        return this.sampleService.updateSample(id, status);
    }
}
