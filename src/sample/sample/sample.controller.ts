import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SampleService} from "./sample.service";
import {SampleModel} from "./sample.model";

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
    createSample(@Body('name') name:string){
        return this.sampleService.createSample(name);
    }
}
