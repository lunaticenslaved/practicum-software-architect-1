import axios from "axios";
import { ITelemetryService, TemperatureData } from "../domain/services";

export class TelemetryService implements ITelemetryService {
    constructor(
        private url: string
    ) {}

    async getTemperatureByLocation(location: string): Promise<TemperatureData> {
        const respose = await axios.get<TemperatureData>(`${this.url}/temperature?location=${location}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return respose.data;
    }

    async getTemperatureBySensorId(sensorId: string): Promise<TemperatureData> {
         const respose = await axios.get<TemperatureData>(`${this.url}/temperature/${sensorId}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return respose.data;
    }
    
}