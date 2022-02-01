'use strict'

import colors from "colors";
import { version } from './package.json';

import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 2000

const APIRestServer = express();
APIRestServer.use(cors());

const avlRouter = require('./src/avlRouter/avlRouter');
APIRestServer.use('/avls', avlRouter);

APIRestServer.on('error', (e) => {
   console.error(`ERROR: ${e}`.bgRed);
});

APIRestServer.listen(PORT, () => {
   console.info(`RDS-BL API REST ${version}`);
   console.info(`RDS-BL API REST http://localhost:${PORT}`.bgBlue);
});

export default APIRestServer;