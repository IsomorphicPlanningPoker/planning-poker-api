import { Game } from './game.interface';

export class GameService {

  static setGame(state: Game, payload: { game: Game }): Game {
    return Object.assign({}, payload.game);
  }

}
