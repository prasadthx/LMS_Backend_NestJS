export interface SampleModel{
    id:number;
    name:string;
    status: ModelStatus;
}

export enum ModelStatus{
    VERIFIED = 'VERIFIED',
    UNVERIFIED = 'UNVERIFIED'
}