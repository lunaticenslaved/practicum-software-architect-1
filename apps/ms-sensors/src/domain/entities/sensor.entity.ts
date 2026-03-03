export type Sensor = {
    id: string,
    name: string,
    type: string,
    location: string,
    value?: number,
    unit?: string,
    status?: string,
    lastUpdated: Date,
    createdAt: Date,
} 