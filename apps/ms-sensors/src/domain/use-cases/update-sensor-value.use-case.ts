import { Sensor } from "../entities";
import { ISensorRepository } from "../repositories";
import { IUseCase, UseCaseValidationResult } from "./types";

type Input = {
    id: string,
    value: number;
    status: string;
}

type Output = Sensor;

export class UpdateSensorValueUseCase implements IUseCase<Input, Output> {
    constructor(
        private sensorRepository: ISensorRepository,
    ) {}

    execute(input: Input): Promise<Output> {
        return this.sensorRepository.updateSendor({
            id: input.id,
            value: input.value,
            status: input.status,
        })
    }
    
    validate(data: unknown): Promise<UseCaseValidationResult<Input>> {
        return Promise.resolve({
            type: 'success',
            input: data as Input
        })
    }
    
}