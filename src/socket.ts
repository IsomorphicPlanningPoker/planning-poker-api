import {GameService} from './shared/game/game.service';
import * as express from 'express';
import * as socketIoFactory from 'socket.io';
import { GAME_ACTIONS } from './shared/game/game.actions';

export function initSocketMagic(app: express.Express) {
  let io = socketIoFactory(app);
  SocketIOService.connect(app);
  let gameRooms = [];
  io.on('connection', socket => {

    socket.on(GAME_ACTIONS.CREATE_GAME, payload => {
      GameService.createGame(payload.game)
        .then(game => {

        if(gameRooms[game._id]) {
          gameRooms[game._id] = io.of('/' + game._id);
          addRoomActions(gameRooms[game._id]);
        }

          socket.emit(GAME_ACTIONS.CREATE_GAME, game);
        });
    });
  });

}
