import { StoryListService } from './story-list.service';
import * as Mocks from '../utils/mocks';
import deepFreeze = require('deep-freeze');

describe('StoryListService:', () => {

  deepFreeze(Mocks);

  it('should add a new story', () => {
    expect(StoryListService.addStory(Mocks.game.stories, { story: Mocks.story })).toEqual(Mocks.gameWithStory.stories);
  });

  it('should edit a story', () => {
    var editedStory = Object.assign({}, Mocks.story, { name: 'newstoryname' });
    deepFreeze(editedStory);

    expect(StoryListService.editStory(Mocks.gameWithStory.stories, { story: editedStory })).toEqual([editedStory]);
  });

  it('should remove a story', () => {
    expect(StoryListService.removeStory(Mocks.gameWithStory.stories, { story: Mocks.story })).toEqual(Mocks.game.stories);
  });

});
