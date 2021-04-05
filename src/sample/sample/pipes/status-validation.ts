import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {ModelStatus} from "../sample.model";

export class StatusValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is invalid status`)
        }
        return value;
    }

    private isStatusValid(status:any){
        if (status in ModelStatus){
               return true;
        }
    }

}