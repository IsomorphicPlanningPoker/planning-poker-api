import { Game } from './game.interface';
import { ReduxAction } from '../utils/action.interface';
import { DEFAULT_REDUX_ACTION } from '../utils/default-action.constant';
import { StoryListService } from '../story/story-list.service';
import { StoryReducer } from '../story/story.reducer';
import { GAME_ACTIONS } from './game.actions';
import { GameService } from './game.service';

export function GameReducer(state: Game, action: ReduxAction = DEFAULT_REDUX_ACTION): Game {

  switch (action.type) {

    // HERE GOES THE ACTIONS FOR ROOT STATE ATTRIBUTES
    case GAME_ACTIONS.SET_GAME:
      return GameService.setGame(state, action.payload);

    // STORY LIST RELATED ACTIONS
    case GAME_ACTIONS.ADD_STORY:
      return Object.assign({}, state, { stories: StoryListService.addStory(state.stories, action.payload) });
    case GAME_ACTIONS.EDIT_STORY:
      return Object.assign({}, state, { stories: StoryListService.editStory(state.stories, action.payload) });
    case GAME_ACTIONS.REMOVE_STORY:
      return Object.assign({}, state, { stories: StoryListService.removeStory(state.stories, action.payload) });

    default:
      // REDUCER DELEGATION
      return Object.assign({}, state, {
        stories: state.stories.map((stateStory) => {
          return StoryReducer(stateStory, action);
        })
      });

  }

}
