import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ModelStatus, SampleModel} from "./sample.model";
import {CreateSampleDto} from "./dto/createSample-dto";
import {SampleRepository} from "./sample.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {SampleEntity} from "./sample.entity";
import {GetSampleFilterDto} from "./dto/getSampleFilter-dto";
import {User} from "../../auth/user.entity";

@Injectable()
export class SampleService {
    constructor(
        @InjectRepository(SampleRepository)
        private sampleRepository: SampleRepository) {
    }

    getSamples(getSampleFilterDto : GetSampleFilterDto, user:User) : Promise<SampleEntity[]> {
        return this.sampleRepository.getSamples(getSampleFilterDto, user).then(
            (samples) => {
                return samples;
            }
        )
    }

    getSampleById(id:number, user:User): Promise<SampleEntity>{
        return this.sampleRepository.findOne({where:{id, userId:user.id}}).then(
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

    createSample(createSampleDto : CreateSampleDto, user:User) : Promise<SampleEntity>{
        return this.sampleRepository.createSample(createSampleDto, user);
    }

    deleteSample(id: number, user:User) {
        return this.sampleRepository.delete({id, userId:user.id}).then(
            (result) => {
                if(!result.affected){
                    throw new NotFoundException(`Sample with ${id} not found`)
                }
                else
                    return "Deleted Successfully";
            }
        )
    }

    updateSample(id:number, status: ModelStatus, user:User) : Promise<SampleEntity>{
       return this.getSampleById(id, user).then(
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
