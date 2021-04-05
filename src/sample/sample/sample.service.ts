import {Injectable, NotFoundException} from '@nestjs/common';
import {ModelStatus, SampleModel} from "./sample.model";
import {v4 as uuidv4} from 'uuid';
import {CreateSampleDto} from "./dto/createSample-dto";

@Injectable()
export class SampleService {

    id = 1;

    samples : SampleModel[] = []
    getHello() {
        return "Hello Prasad";
    }

    getAllSamples() : SampleModel[] {
        return this.samples;
    }

    getSampleById(id:number) : SampleModel{
        const found = this.samples.find((sample) => sample.id === id);
        if(!found){
           throw new NotFoundException(`Sample with id ${id} not found`);
        }
        else
            return found;
    }

    createSample(createSampleDto : CreateSampleDto){
        const { name } = createSampleDto
        const sample: SampleModel = {
            id:uuidv4(),
            name,
            status: ModelStatus.UNVERIFIED
        }
        this.samples.push(sample);
        return sample;
    }

    deleteSample(id: number) {
        const found = this.getSampleById(id);
        this.samples = this.samples.filter((sample)=> sample.id !== id)
        return this.samples
    }

    updateSample(id:number, status:ModelStatus){
        const sample = this.getSampleById(id);
        sample.status = status;
        return status;
    }
}
