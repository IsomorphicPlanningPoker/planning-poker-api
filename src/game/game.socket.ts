import { GameAPIService } from './game.api.service';
import { SocketIOService } from './../socket/socket.service';
import { GAME_ACTIONS } from './../shared/game/game.actions';
import * as _ from 'lodash';

let socketIOService = SocketIOService.getInstance();

function onCreateGameListener(payload) {

  GameAPIService.createGame(payload.game)
    .then((newGame) => {

      socketIOService.createRoom(newGame._id)
        .on(GAME_ACTIONS.GET_GAME, (payload) => {
          GameAPIService.getGame(newGame._id).then((updatedGame) => {
            socketIOService.rooms[newGame._id].emit(GAME_ACTIONS.GET_GAME, updatedGame);
          });
        })
        .on(GAME_ACTIONS.ADD_STORY, (payload) => {
          GameAPIService.addStory(newGame._id, payload.story)
            .then((updatedGame) => {
              socketIOService.rooms[newGame._id].emit(GAME_ACTIONS.ADD_STORY, updatedGame);
            });
        })
        .on(GAME_ACTIONS.EDIT_STORY, (payload) => {
          GameAPIService.editStory(newGame._id, payload.story)
            .then((updatedGame) => {
              socketIOService.rooms[newGame._id].emit(GAME_ACTIONS.EDIT_STORY, updatedGame);
            });
        })
        .on(GAME_ACTIONS.VOTE_STORY, (payload) => {
          GameAPIService.voteStory(newGame._id, payload.storyId, payload.vote)
            .then((updatedGame) => {
              socketIOService.rooms[newGame._id].emit(GAME_ACTIONS.VOTE_STORY, updatedGame);
            });
        })
        .emit(GAME_ACTIONS.CREATE_GAME, newGame);

    });

}
