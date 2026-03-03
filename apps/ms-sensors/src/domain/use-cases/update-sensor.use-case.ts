import { Sensor } from "../entities";
import { ISensorRepository } from "../repositories";
import { IUseCase, UseCaseValidationResult } from "./types";

type Input = {
    id: string, 
    name?: string, 
    type?: string, 
    location?: string, 
    value?: number, 
    unit?: string, 
    status?: string,
}

type Output = Sensor;

export class UpdateSensorUseCase implements IUseCase<Input, Output> {
    constructor(
        private sensorRepository: ISensorRepository
    ) {}

    execute(input: Input): Promise<Output> {
        return this.sensorRepository.updateSendor(input)
    }
    
    validate(data: unknown): Promise<UseCaseValidationResult<Input>> {
        return Promise.resolve({
            type: 'success',
            input: data as Input
        })
    }
    
}