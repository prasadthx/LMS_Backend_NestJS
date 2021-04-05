import { PipeTransform } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

export class CreateSampleDto{
    @IsNotEmpty()
    name:string;
}