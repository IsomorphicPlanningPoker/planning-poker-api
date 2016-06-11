'use strict';

import * as bluebird from 'bluebird';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { mongoConfig } from './config';
import { GameSchema } from './game/game.schema';
import { connection } from './db';

connection.once('open', () => {

  console.log('DB opened!');
  
  initApp();
});

function initApp() {
  const app: express.Express = express();
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cors());
}
