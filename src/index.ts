'use strict';

import * as bluebird from 'bluebird';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import { mongoConfig } from './config';
import { GameSchema } from './game/game.schema';



bluebird.promisifyAll(mongoose);

const connection = mongoose.createConnection(mongoConfig.uri, mongoConfig.options);

mongoose.set('debug', true);

export const GameModel = connection.model('Game', GameSchema, 'games');

connection.once('open', () => {

  console.log('DB opened!');

  GameModel.create({
    name: 'HOLA',
    owner: 'CHAU'
  }, function(err, res){
    if(err) {
      console.log(err);
      throw err;
    }

    console.log('Respuesta, ', res);
  });

  initApp();
});

function initApp() {
  const app: express.Express = express();
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cors());
}

