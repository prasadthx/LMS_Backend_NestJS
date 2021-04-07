import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Query, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {SampleService} from "./sample.service";
import {ModelStatus, SampleModel} from "./sample.model";
import {CreateSampleDto} from "./dto/createSample-dto";
import {StatusValidationPipe} from "./pipes/status-validation";
import {SampleEntity} from "./sample.entity";
import {GetSampleFilterDto} from "./dto/getSampleFilter-dto";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../../auth/get.user.decorator";
import {User} from "../../auth/user.entity";

@Controller('sample')
@UseGuards(AuthGuard())
export class SampleController {
    constructor(private sampleService: SampleService) {
    }

    @Get()
    getSample(
        @Query(ValidationPipe) getSampleFilterDto : GetSampleFilterDto,
        @GetUser() user:User
    ){
        return this.sampleService.getSamples(getSampleFilterDto, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSample(
        @Body() createSampleDto: CreateSampleDto,
        @GetUser() user:User,
    ){
        return this.sampleService.createSample(createSampleDto, user);
    }
    //
    @Get(':id')
    getSampleById(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user:User
        ): Promise<SampleEntity>{
        return this.sampleService.getSampleById(id, user);
    }

    @Delete(':id')
    deleteSample(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user: User,
    ): Promise<string> {
        return this.sampleService.deleteSample(id, user);
    }

    @Patch(':id')
    updateSample(@Body('status', StatusValidationPipe) status: ModelStatus, @Param ('id', ParseIntPipe) id:number, @GetUser() user: User) : Promise<SampleEntity>{
        return this.sampleService.updateSample(id, status, user);
    }
}
