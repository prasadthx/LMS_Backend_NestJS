import { Injectable } from '@nestjs/common';
import {SampleModel} from "./sample.model";
import { v4 as uuidv4 } from 'uuid';
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
        return this.samples.find((sample) => sample.id === id);
    }

    createSample(createSampleDto : CreateSampleDto){
        const { name } = createSampleDto
        const sample: SampleModel = {
            id:uuidv4(),
            name
        }
        this.samples.push(sample);
        return sample;
    }

    deleteSample(id: number) {
        this.samples = this.samples.filter((sample)=> sample.id !== id)
        return this.samples
    }

    updateSample(id:number, name:string){
        const sample = this.getSampleById(id);
        sample.name = name;
        return name;
    }
}
