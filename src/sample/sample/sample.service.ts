import { Injectable } from '@nestjs/common';
import {SampleModel} from "./sample.model";
import { v4 as uuidv4 } from 'uuid';

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

    createSample(name: string){
        const sample: SampleModel = {
            id:uuidv4(),
            name
        }
        this.samples.push(sample);
        return sample;
    }
}
