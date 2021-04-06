import {EntityRepository, Repository} from "typeorm";
import {SampleEntity} from "./sample.entity";
import {CreateSampleDto} from "./dto/createSample-dto";
import {ModelStatus} from "./sample.model";

@EntityRepository(SampleEntity)
export class SampleRepository extends Repository<SampleEntity>{
    createSample(createSampleDto : CreateSampleDto) : Promise<SampleEntity>{
        const { name } = createSampleDto;
        const sample = new SampleEntity();
        sample.name = name;
        sample.status = ModelStatus.UNVERIFIED;
        return sample.save().then((sample)=>{ console.log(sample);return sample });
    }
}