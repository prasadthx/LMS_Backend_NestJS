import {Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {SampleService} from "./sample.service";
import {ModelStatus, SampleModel} from "./sample.model";
import {CreateSampleDto} from "./dto/createSample-dto";
import {StatusValidationPipe} from "./pipes/status-validation";

@Controller('sample')
export class SampleController {
    constructor(private sampleService: SampleService) {
    }


    @Get()
    getHelloPrasad(){
        return this.sampleService.getHello();
    }

    @Get('all')
    getAllSamples() : SampleModel[]{
        return this.sampleService.getAllSamples();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSample(@Body() createSampleDto: CreateSampleDto){
        return this.sampleService.createSample(createSampleDto);
    }

    @Get(':id')
    getSampleById(@Param('id') id:number){
        return this.sampleService.getSampleById(id);
    }

    @Delete(':id')
    deleteSample(@Param('id') id:number){
        return this.sampleService.deleteSample(id);
    }

    @Patch(':id')
    updateSample(@Body('status', StatusValidationPipe) status: ModelStatus, @Param ('id') id:number){
        return this.sampleService.updateSample(id, status);
    }
}
