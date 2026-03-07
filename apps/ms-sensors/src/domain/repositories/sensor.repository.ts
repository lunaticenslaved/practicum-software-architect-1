import { Sensor } from "../entities";

export interface ISensorRepository {
    createSensor(arg: {id: number; name: string, type: string, location: string, unit: string}): Promise<Sensor>
    updateSendor(arg: {id: number, name?: string, type?: string, location?: string, value?: number, unit?: string, status?: string}): Promise<Sensor>
    deleteSensor(arg: {id: number}): Promise<void>
    findOneSensor(arg: {id: number}): Promise<Sensor | null>
    findManySensors(): Promise<Sensor[]>
}
