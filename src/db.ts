'use strict';

import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import { mongoConfig } from './config';
import { GameSchema } from './game/game.schema';

bluebird.promisifyAll(mongoose);

export const connection = mongoose.createConnection(mongoConfig[process.env.NODE_ENV].uri, mongoConfig.options);

if (process.env.NODE_ENV === 'test')
  mongoose.set('debug', true);
