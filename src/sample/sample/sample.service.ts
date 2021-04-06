import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ModelStatus, SampleModel} from "./sample.model";
import {CreateSampleDto} from "./dto/createSample-dto";
import {SampleRepository} from "./sample.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {SampleEntity} from "./sample.entity";
import {GetSampleFilterDto} from "./dto/getSampleFilter-dto";

@Injectable()
export class SampleService {
    constructor(
        @InjectRepository(SampleRepository)
        private sampleRepository: SampleRepository) {
    }

    getSamples(getSampleFilterDto : GetSampleFilterDto) : Promise<SampleEntity[]> {
        return this.sampleRepository.getSamples(getSampleFilterDto).then(
            (samples) => {
                return samples;
            }
        )
    }

    getSampleById(id:number): Promise<SampleEntity>{
        return this.sampleRepository.findOne(id).then(
            ((found) => {
                if(!found){
                    throw new BadRequestException(`The sample with ${id} does not exist`);
                }
                else {
                    return found;
                }
            })
        )
    }

    createSample(createSampleDto : CreateSampleDto) : Promise<SampleEntity>{
        return this.sampleRepository.createSample(createSampleDto);
    }

    deleteSample(id: number) {
        return this.sampleRepository.delete(id).then(
            (result) => {
                if(!result.affected){
                    throw new NotFoundException(`Sample with ${id} not found`)
                }
                else
                    return "Deleted Successfully";
            }
        )
    }

    updateSample(id:number, status: ModelStatus) : Promise<SampleEntity>{
       return this.getSampleById(id).then(
           (sample) => {
               sample.status = status;
               return sample.save().then(
                   (sample) => {
                       return sample;
                   }
               )

           }
       )
    }

}
