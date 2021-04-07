import {EntityRepository, Repository} from "typeorm";
import {SampleEntity} from "./sample.entity";
import {CreateSampleDto} from "./dto/createSample-dto";
import {ModelStatus} from "./sample.model";
import {GetSampleFilterDto} from "./dto/getSampleFilter-dto";
import {User} from "../../auth/user.entity";

@EntityRepository(SampleEntity)
export class SampleRepository extends Repository<SampleEntity>{

    getSamples(filterDto:GetSampleFilterDto, user:User) : Promise<SampleEntity[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('sample');

        query.where('sample.userId = :userId', { userId: user.id });

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

    createSample(createSampleDto : CreateSampleDto, user:User) : Promise<SampleEntity>{
        const { name } = createSampleDto;
        const sample = new SampleEntity();
        sample.name = name;
        sample.status = ModelStatus.UNVERIFIED;
        sample.user = user;
        return sample.save().then((sample)=>{ console.log(sample);delete sample.user;return sample });
    }
}