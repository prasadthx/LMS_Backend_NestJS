import {EntityRepository, Repository} from "typeorm";
import {SampleEntity} from "./sample.entity";
import {CreateSampleDto} from "./dto/createSample-dto";
import {ModelStatus} from "./sample.model";
import {GetSampleFilterDto} from "./dto/getSampleFilter-dto";

@EntityRepository(SampleEntity)
export class SampleRepository extends Repository<SampleEntity>{

    getSamples(filterDto:GetSampleFilterDto) : Promise<SampleEntity[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('sample');

        if(status){
            query.andWhere('sample.status = :status', {status:status});
        }

        if(search){
            query.andWhere('sample.name LIKE :name',{name: `%${search}%`});
        }

        return query.getMany().then(
            (samples) => {
                return samples;
            }
        );
    }

    createSample(createSampleDto : CreateSampleDto) : Promise<SampleEntity>{
        const { name } = createSampleDto;
        const sample = new SampleEntity();
        sample.name = name;
        sample.status = ModelStatus.UNVERIFIED;
        return sample.save().then((sample)=>{ console.log(sample);return sample });
    }
}