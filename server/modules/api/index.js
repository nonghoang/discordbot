import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import initAllRoutes from 'modules/api/routes/all';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initAllRoutes(app);

export default app;
