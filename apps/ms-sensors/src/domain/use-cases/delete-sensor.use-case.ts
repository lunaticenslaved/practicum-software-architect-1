import { Sensor } from "../entities";
import { ISensorRepository } from "../repositories";
import { IUseCase, UseCaseValidationResult } from "./types";

type Input = {
    id: Sensor['id']
}

type Output = void

export class DeleteSensorUseCase implements IUseCase<Input, Output> {
    constructor(
        private sensorRepository: ISensorRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        await this.sensorRepository.deleteSensor({id: input.id})
    }
    
    validate(data: unknown): Promise<UseCaseValidationResult<Input>> {
        return Promise.resolve({
            type: 'success',
            input: data as Input
        })
    }
    
}