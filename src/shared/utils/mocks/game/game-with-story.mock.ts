import { Game } from '../../../game/game.interface';
import { story } from '../story/story.mock';

export const gameWithStory: Game = {
  _id: 'testgameid',
  name: 'testgamename',
  stories: [ story ]
};
