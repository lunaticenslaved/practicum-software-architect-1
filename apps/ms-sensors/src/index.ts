import express, { Request, Response } from 'express';
import {RegisterSensorUseCase, UpdateSensorValueUseCase, UpdateSensorUseCase, DeleteSensorUseCase, GetSensorByIdUseCase, ListSensorsUseCase} from './domain/use-cases'
import {SensorRepository} from './repositories'
import { IUseCase } from './domain/use-cases/types';
import {TelemetryService} from './services'

const app = express();
const PORT = process.env.PORT || 8080;
const TELEMETRY_SERVICE_URL = process.env.TELEMETRY_SERVICE_URL ?? '';

const sensorRepository = new SensorRepository();
const telemetryService = new TelemetryService(TELEMETRY_SERVICE_URL)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthcheck', (req: Request, res: Response) => {
  res.json('Ready!');
});

app.get('/sensors', async (req: Request, res: Response) => {
    const uc = new ListSensorsUseCase(sensorRepository, telemetryService);

    return callUseCase(uc, {}, res);
});

app.get('/sensors/:id', async (req: Request, res: Response) => {
    const uc = new GetSensorByIdUseCase(sensorRepository, telemetryService);
    const data = {id: req.params.id};

    return callUseCase(uc, data, res);
});

app.post('/sensors', async (req: Request, res: Response) => {
    const uc = new RegisterSensorUseCase(sensorRepository);
    const data = req.body;

    return callUseCase(uc, data, res);
});

app.put('/sensors/:id', async (req: Request, res: Response) => {
    const uc = new UpdateSensorUseCase(sensorRepository);
    const data = {id: req.params.id, ...req.body};

    return callUseCase(uc, data, res);
});

app.patch('/sensors/:id/value', async (req: Request, res: Response) => {
    const uc = new UpdateSensorValueUseCase(sensorRepository);
    const data = {value: req.body.value, status: req.body.status, id: req.params.id};

    return callUseCase(uc, data, res);
});

app.delete('/sensors/:id', async (req: Request, res: Response) => {
    const uc = new DeleteSensorUseCase(sensorRepository);
    const data = {id: req.params.id};

    return callUseCase(uc, data, res);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

async function callUseCase<T, R>(uc: IUseCase<T, R>, data: unknown, res: Response) {
 const validationResult = await uc.validate(data)

    if (validationResult.type === 'success') {
        const result = await uc.execute(validationResult.input)

        return res.status(200).json(result);
    } else {
        return res.status(400).json({ error: validationResult.error.message });
    }
}