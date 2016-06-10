import { Story } from './story.interface';
import { ReduxAction } from '../utils/action.interface';
import { DEFAULT_REDUX_ACTION } from '../utils/default-action.constant';
import { VoteListService } from '../vote/vote-list.service';
import { STORY_ACTIONS } from './story.actions';

export function StoryReducer(state: Story, action: ReduxAction = DEFAULT_REDUX_ACTION): Story {

  switch (action.type) {

    case STORY_ACTIONS.ADD_VOTE:
      return Object.assign({}, state, { votes: VoteListService.addVote(state.votes, action.payload) });
    case STORY_ACTIONS.EDIT_VOTE:
      return Object.assign({}, state, { votes: VoteListService.editVote(state.votes, action.payload) });
    case STORY_ACTIONS.REMOVE_VOTE:
      return Object.assign({}, state, { votes: VoteListService.removeVote(state.votes, action.payload) });
    default:
      return state;

  }

}
