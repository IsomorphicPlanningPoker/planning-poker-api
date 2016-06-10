import * as _ from 'lodash';
import { Story } from './story.interface';

export class StoryListService {

  static addStory(state: Array<Story>, payload: { story: Story }): Array<Story> {
    return [
      ...state,
      Object.assign({}, payload.story)
    ];
  }

  static editStory(state: Array<Story>, payload: { story: Story }): Array<Story> {
    let index = _.findIndex(state, { _id: payload.story._id });

    return [
      ...state.slice(0, index),
      Object.assign({}, payload.story),
      ...state.slice(index + 1),
    ];
  }

  static removeStory(state: Array<Story>, payload: { story: Story }): Array<Story> {
    let index = _.findIndex(state, { _id: payload.story._id });

    return [
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ];
  }

}
