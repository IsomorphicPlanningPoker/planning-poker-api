'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import { connection } from './db';
import { gameRouter } from './game/game.endpoint';

connection.once('open', () => {

  console.log('DB opened!');
  initApp();

});

function initApp() {
  const app: express.Express = express();
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cors());

  app.use('/api/games', gameRouter)

}
