import { Game } from '../shared/game/game.interface';
import { GameService } from './game.service';

describe('GameAPIService:', () => {

  it('should add a new story', (done) => {

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name'
    };

    GameService.createGame(game).then((newGame) => {

      console.log('New game ', JSON.stringify(newGame));

      expect(newGame).toContain('_id');
      done();
    });

  });

  // it('should edit a story', () => {
  //   var editedStory = Object.assign({}, Mocks.story, { name: 'newstoryname' });
  //   deepFreeze(editedStory);
  //
  //   expect(StoryListService.editStory(Mocks.gameWithStory.stories, { story: editedStory })).toEqual([editedStory]);
  // });
  //
  // it('should remove a story', () => {
  //   expect(StoryListService.removeStory(Mocks.gameWithStory.stories, { story: Mocks.story })).toEqual(Mocks.game.stories);
  // });

});
