export type TemperatureData = {
    value: number,
    unit: string,
    timestamp: Date,
    location: string,
    status: 'active',
    sensorId: number,
    sensorType: 'temperature',
    description: string,
}

export interface ITelemetryService {
    getTemperatureByLocation(location: string): Promise<TemperatureData>;
    getTemperatureBySensorId(sensorId: number): Promise<TemperatureData>;
}
