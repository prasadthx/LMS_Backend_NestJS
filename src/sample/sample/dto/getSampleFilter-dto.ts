import {ModelStatus} from "../sample.model";

export class GetSampleFilterDto {
    status : ModelStatus;
    search : string;
}