import axios from "axios";
import { ITelemetryService, TemperatureData } from "../domain/services";

export class TelemetryService implements ITelemetryService {
    constructor(
        private url: string
    ) {}

    async getTemperatureByLocation(location: string): Promise<TemperatureData> {
        const response = await axios.get<TemperatureData>(`${this.url}/temperature?location=${location}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }

    async getTemperatureBySensorId(sensorId: number): Promise<TemperatureData> {
         const response = await axios.get<TemperatureData>(`${this.url}/temperature/${sensorId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }
    
}
