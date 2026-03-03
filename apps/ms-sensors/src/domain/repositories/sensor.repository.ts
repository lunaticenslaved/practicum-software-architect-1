import { Sensor } from "../entities";

export interface ISensorRepository {
    createSensor(arg: {name: string, type: string, location: string}): Promise<Sensor>
    updateSendor(arg: {id: string, name?: string, type?: string, location?: string, value?: number, unit?: string, status?: string}): Promise<Sensor>
    deleteSensor(arg: {id: string}): Promise<void>
    findOneSensor(arg: {id: string}): Promise<Sensor | null>
    findManySensors(): Promise<Sensor[]>
}