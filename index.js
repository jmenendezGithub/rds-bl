'use strict'

//import { version } from './package.json';
const version = process.env.npm_package_version;

const express = require("express");
const cors = require("cors");
const colors = require('colors');

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

//export default APIRestServer;