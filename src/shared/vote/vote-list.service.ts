import * as _ from 'lodash';
import { Vote } from './vote.interface';


export class VoteListService {

  static addVote(state: Array<Vote>, payload: { vote: Vote }): Array<Vote> {
    return [
      ...state,
      Object.assign({}, payload.vote)
    ];
  }

  static editVote(state: Array<Vote>, payload: { vote: Vote }): Array<Vote> {
    let index = _.findIndex(state, { _id: payload.vote._id });

    return [
      ...state.slice(0, index),
      Object.assign({}, payload.vote),
      ...state.slice(index + 1),
    ];
  }

  static removeVote(state: Array<Vote>, payload: { vote: Vote }): Array<Vote> {
    let index = _.findIndex(state, { _id: payload.vote._id });

    return [
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ];
  }
}
