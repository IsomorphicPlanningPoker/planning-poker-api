import { Vote } from './../shared/vote/vote.interface';
import { GameModel } from './../app.models';
import { leanify } from '../utils/db.utils';
import { Game } from '../shared/game/game.interface';
import { Story } from '../shared/story/story.interface';

export class GameAPIService {

  static createGame(game: Game) {
    return Promise.resolve(GameModel.create(game))
      .then(leanify);
  }

  static getGame(gameId: string) {
    return Promise.resolve(GameModel.findById(gameId).exec())
      .then(leanify);
  }

  static addStory(gameId: string, story: Story) {
    return Promise.resolve(GameModel.findByIdAndUpdate(gameId, {
      '$push': { 'stories': story }
    }, { 'new': true }).exec())
      .then(leanify);
  }

  static editStory(gameId: string, story: Story) {
    return Promise.resolve(GameModel.update({
      '_id': gameId,
      'stories._id': story._id
    }, {
        '$set': {
          'stories.$': story
        }
      }));
  }

  static voteStory(gameId: string, storyId: string, vote: Vote) {

    let type = vote._id ? 'EDIT_VOTE' : 'ADD_VOTE';

    let actionMap = {
      'ADD_VOTE': {
        'query': { '_id': gameId, 'stories._id': storyId },
        'action': { '$push': { 'stories.0.votes': vote } }
      },
      'EDIT_VOTE': {
        'query': { '_id': gameId, 'stories._id': storyId, 'stories.votes._id': vote._id },
        'action': { '$set': { 'stories.0.votes.$': vote } }
      }
    }

    return Promise.resolve(GameModel.update(actionMap[type].query, actionMap[type].action))
      .then(() => GameAPIService.getGame(gameId));

  }

}
