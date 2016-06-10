import { Game } from '../shared/game/game.interface';
import { Story } from '../shared/story/story.interface';
import { GameModel } from '../index';

export class GameService {

  static createGame(game: Game) {
    return GameModel.createAsync(game);
  }

  static getGame(gameId: string) {
    return GameModel.findByIdAsync(gameId);
  }

  static addStory(gameId: string, story: Story) {
    return GameModel.findByIdAndUpdateAsync(gameId, {
      '$push': { 'stories': story }
    }, { 'new': true });
  }

  static editStory(gameId: string, story: Story) {
    // return GameModel.findByIdAndUpdateAsync(gameId, {
    //   '$set': { 'stories._id': story._id }
    // }, { 'new': true });

    return GameModel.updateAsync({
      '_id': gameId,
      'stories._id': story._id
    }, {
      '$set': {
        'stories.$': story
      }
    });
  }

}
