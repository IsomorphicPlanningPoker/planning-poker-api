import {GameSchema} from './game/game.schema';
import { connection } from './db';

export const GameModel = connection.model('Game', GameSchema, 'games');
