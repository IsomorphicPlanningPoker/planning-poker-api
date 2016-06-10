'use strict';

import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import { mongoConfig } from './config';
import { GameSchema } from './game/game.schema';

bluebird.promisifyAll(mongoose);

const connection = mongoose.createConnection(mongoConfig[process.env.NODE_ENV].uri, mongoConfig.options);

// if
mongoose.set('debug', true);

export const GameModel = connection.model('Game', GameSchema, 'games');
