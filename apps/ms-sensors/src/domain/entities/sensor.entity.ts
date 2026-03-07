export type Sensor = {
    id: number,
    name: string,
    type: string,
    location: string,
    value?: number,
    unit?: string,
    status?: string,
    lastUpdated: Date,
    createdAt: Date,
} 
