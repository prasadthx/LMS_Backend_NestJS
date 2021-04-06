import {ModelStatus} from "../sample.model";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetSampleFilterDto {
    @IsOptional()
    @IsIn([ModelStatus.UNVERIFIED, ModelStatus.VERIFIED])
    status : ModelStatus;

    @IsOptional()
    @IsNotEmpty()
    search : string;
}