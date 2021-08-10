require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { initializeFirebase} from './firebase';
import { responseMiddleware } from './middlewares/response.middleware';
import routes from './routes';

initializeFirebase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
app.use(responseMiddleware);

const port = 3050;
app.listen(process.env.PORT || port, () => {
    console.log(`started on port ${port}`);
});

exports.app = app;