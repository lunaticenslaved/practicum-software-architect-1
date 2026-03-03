import { Sensor } from '../domain/entities';
import {ISensorRepository} from '../domain/repositories';

let list: Sensor[] = [];

export class SensorRepository implements ISensorRepository {
    createSensor(arg: { name: string; type: string; location: string; }): Promise<Sensor> {
        const now = new Date();
     
        const newSensor: Sensor = {
            id: (list.length + 1).toString(),
            name: arg.name,
            type: arg.type,
            location: arg.location,
            createdAt: now,
            lastUpdated: now,
        }

        return Promise.resolve(newSensor)
    }

    updateSendor(arg: { id: string; name?: string; type?: string; location?: string; value?: number; unit?: string; status?: string; }): Promise<Sensor> {
        const now = new Date();

        const foundSensor = list.find(s => s.id === arg.id);

        if (!foundSensor) {
            throw new Error(`Sensor with id '${arg.id}' does not exist.`)
        }

        const updated: Sensor = {
            ...foundSensor,
            name: arg.name ?? foundSensor.name,
            type: arg.type ?? foundSensor.type,
            location: arg.location ?? foundSensor.location,
            value: arg.value ?? foundSensor.value,
            unit: arg.unit ?? foundSensor.unit,
            status: arg.status ?? foundSensor.status,
        } 

        list = list.map(s => s.id === updated.id ? updated : s);

        return Promise.resolve(updated);
    }

    deleteSensor(arg: { id: string; }): Promise<void> {
        list = list.filter(s => s.id !== arg.id);

        return Promise.resolve();
    }

    findOneSensor(arg: { id: string; }): Promise<Sensor | null> {
        const now = new Date();
        const foundSensor = list.find(s => s.id === arg.id);

        return Promise.resolve(foundSensor ?? null);
    }

    findManySensors() {
        return Promise.resolve(list);
    }
}