import express, { Request, Response } from 'express';
import { TemperatureAPIService } from './temperature-api.service';

const app = express();
const PORT = process.env.PORT || 8080;
const TEMPERATURE_API_URL = process.env.TEMPERATURE_API_URL ?? '';

const temperatureAPIService = new TemperatureAPIService(TEMPERATURE_API_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthcheck', (req: Request, res: Response) => {
  res.json('Ready!');
});

app.get('/temperature', async (req: Request, res: Response) => {
    const location = req.query.location as string;

    if (!location) {
        return res.status(400).json({
            error: 'Not location provided!'
        })
    }
    
    const result = await temperatureAPIService.getTemperatureByLocation(location);

    return res.status(200).json(result)
});

app.get('/temperature/:id', async (req: Request, res: Response) => {
    const sensorId = req.params.id as string;

    if (!sensorId) {
        return res.status(400).json({
            error: 'Not sensorId provided!'
        })
    }
    
    const result = await temperatureAPIService.getTemperatureBySensorId(sensorId);

    return res.status(200).json(result)
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});