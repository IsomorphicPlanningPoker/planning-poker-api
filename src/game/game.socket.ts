import {GameService} from './../shared/game/game.service';
import { SocketIOService } from './../socket/socket.service';
import { GameService } from './../shared/game/game.service';
import { GAME_ACTIONS } from './../shared/game/game.actions';
import * as _ from 'lodash';

let socketIOService = SocketIOService.getInstance();

function responseHandler(roomId, actionName, res) {
  socketIOService.emit(roomId, actionName, res);
}
const roomListeners = [
  {
    eventName: GAME_ACTIONS.GET_GAME,
    listener: (roomId, actionName) => {
      return (payload) => {
        GameService.getGame().then(_.partial(responseHandler, roomId, actionName))
      }
    }
  },
  {
    eventName: GAME_ACTIONS.ADD_STORY,
    listener: () => {}
  },
  {
    eventName: GAME_ACTIONS.EDIT_STORY,
    listener: () => {}
  },
  {
    eventName: GAME_ACTIONS.REMOVE_STORY,
    listener: () => {}
  }
];


// GameService.createGame(payload.game)
//   .then((newGame) => {
//
//     SocketIOService.getInstance()
//         .createRoom(newGame._id);
//
//     // function bla(gameId, action, partializedActionCb){
//     //   partializedActionCb().then((response) => {
//     //     SocketIOService.getInstance()
//     //         .emit(gameId, action, response);
//     //   })
//     // }
//
//     // let map = {};
//     // map[GAME_ACTIONS.GET_GAME] =
//
//     SocketIOService.getInstance()
//         // .on(newGame._id, GAME_ACTIONS.GET_GAME, (payload) => {                  // registramos un socket listener
//         //   return bla(payload.gameId, GAME_ACTIONS.GET_GAME, _.partial(GameService.getGame, payload.gameId))
//         // })
//         .on(newGame._id, GAME_ACTIONS.GET_GAME, (payload) => {                  // registramos un socket listener
//             GameService.getGame(newGame._id).then((gameGame)=> {                // ejecutamos accion contra db
//                   SocketIOService.getInstance()
//                       .emit(newGame._id, GAME_ACTIONS.GET_GAME, gameGame);
//                 });
//         })
//         .on(newGame._id, GAME_ACTIONS.ADD_STORY, (payload) => {
//           GameService.addStory(newGame._id, payload.story)
//               .then((gameGame)=> {
//                 SocketIOService.getInstance()
//                     .emit(newGame._id, GAME_ACTIONS.ADD_STORY, gameGame);
//               });
//         })
//         .on(newGame._id, GAME_ACTIONS.EDIT_STORY, (payload) => {
//           GameService.editStory(newGame._id, payload.story)
//               .then((gameGame)=> {
//                 SocketIOService.getInstance()
//                     .emit(newGame._id, GAME_ACTIONS.EDIT_STORY, gameGame);
//               });
//         })
//         .on(newGame._id, GAME_ACTIONS.VOTE, (payload) => {
//           GameService.voteStory(newGame._id, payload.storyId, payload.vote)
//               .then((gameGame)=> {
//                 SocketIOService.getInstance()
//                     .emit(newGame._id, GAME_ACTIONS.VOTE, gameGame);
//               });
//         });
//
//     SocketIOService.getInstance()
//         .emit(newGame._id, GAME_ACTIONS.CREATE_GAME, newGame);
//
//
//   })

const onCreateGameListener = payload => {
  GameService.createGame(payload.game)
    .then(game => {

    socketIOService.createRoom(game._id);

    roomListeners.map((eventName, listener) => {
      socketIOService.on(game._id, eventName, listener);
    });
    socketIOService.emit(GAME_ACTIONS.CREATE_GAME, game);
}
