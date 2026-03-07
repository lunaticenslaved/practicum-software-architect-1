import { Sensor } from "../entities";
import { ISensorRepository } from "../repositories";
import { IUseCase, UseCaseValidationResult } from "./types";

type Input = {
    id: number;
    name: string,
    type: string,
    location: string,
    unit: string,
}

type Output = Sensor;

export class RegisterSensorUseCase implements IUseCase<Input, Output> {
    constructor(
        private sensorRepository: ISensorRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        return this.sensorRepository.createSensor(input);
    }

    validate(data: unknown): Promise<UseCaseValidationResult<Input>> {
        return Promise.resolve({
            type: 'success',
            input: data as Input
        })
    }
}
