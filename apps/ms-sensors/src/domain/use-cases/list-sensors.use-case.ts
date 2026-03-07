import { Sensor } from "../entities";
import { ISensorRepository } from "../repositories";
import { ITelemetryService } from "../services";
import { IUseCase, UseCaseValidationResult } from "./types";

type Input = void

type Output = Sensor[];

export class ListSensorsUseCase implements IUseCase<Input, Output> {
    constructor(
        private sensorRepository: ISensorRepository,
        private telemetryService: ITelemetryService
    ) {}

    async execute(_input: Input): Promise<Output> {
        const sensors = await this.sensorRepository.findManySensors();

        await Promise.all(sensors.map(async sensor => {
            try {
                const temperatureData = await this.telemetryService.getTemperatureByLocation(sensor.location)

                // TODO получается, что это поля необязательно сейчас хрантиь в БД
                sensor.value = temperatureData.value;
                sensor.status = temperatureData.status;
                sensor.lastUpdated = temperatureData.timestamp;
            } catch (e) {
                const error = e as Error;

                console.error(`Failed to fetch temperature data for sensor ${sensor.id}: ${error.message}`)

                return sensor;
            }
        }))

        return sensors;
    }
    
    validate(data: unknown): Promise<UseCaseValidationResult<Input>> {
        return Promise.resolve({
            type: 'success',
            input: data as Input
        })
    }
    
}