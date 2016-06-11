import {Vote} from './../shared/vote/vote.interface';
import {GameModel} from './../app.models';
import { leanify } from '../utils/db.utils';
import { Game } from '../shared/game/game.interface';
import { Story } from '../shared/story/story.interface';

export class GameService {

  static createGame(game: Game) {
    return GameModel.createAsync(game)
        .then(leanify);
  }

  static getGame(gameId: string) {
    return GameModel.findByIdAsync(gameId)
        .then(leanify);
  }

  static addStory(gameId: string, story: Story) {
    return GameModel.findByIdAndUpdateAsync(gameId, {
      '$push': { 'stories': story }
    }, { 'new': true })
        .then(leanify);
  }

  static editStory(gameId: string, story: Story) {
    return GameModel.updateAsync({
      '_id': gameId,
      'stories._id': story._id
    }, {
      '$set': {
        'stories.$': story
      }
    });
  }

  static voteStory(gameId: string, storyId: string, vote: Vote) {
    if (vote._id) {
      return GameModel.updateAsync({
        '_id': gameId,
        'stories._id': storyId,
        'stories.votes._id': vote._id
      }, {
        '$set': {
          'stories.0.votes.$': vote
        }
      });
    }
    return GameModel.updateAsync({
      '_id': gameId,
      'stories._id': storyId
    }, {
      '$push': {
        'stories.0.votes': vote
      }
    });
  }

}
