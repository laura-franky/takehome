import { authMiddleware } from './middleware/authentication';
// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';

import { createDatabaseConnection } from './util/createDatabaseConnection';
import { globalRouter } from './router/global.router';

const port: number = Number(process.env.PORT);

export const startServer = async () => {
  try {
    const app = express();
    const dbConnection = await createDatabaseConnection();

    app.use(bodyParser.json());
    app.use(authMiddleware);

    app.use('/api', globalRouter);

    const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
    return { server, dbConnection };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// tslint:disable-next-line: no-floating-promises
startServer();
