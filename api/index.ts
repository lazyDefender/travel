import dotenv from 'dotenv'; 

import express, { Router } from 'express';
import cors from 'cors';

import swaggerUI from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

import { initializeFirebase} from './firebase';
import { responseMiddleware } from './middlewares/response.middleware';
import { initApi } from './routes';

dotenv.config();

initializeFirebase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api', initApi(Router));
app.use(responseMiddleware);

const port = 3050;
app.listen(process.env.PORT || port, () => {
    console.log(`started on port ${port}`);
});
