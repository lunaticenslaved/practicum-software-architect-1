import axios from "axios";

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

export class TemperatureAPIService {
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
