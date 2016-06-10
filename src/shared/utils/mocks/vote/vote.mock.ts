import { Vote } from '../../../vote/vote.interface';

export const vote: Vote = {
  _id: 'testvoteid',
  player: {
    _id: 'testplayerid',
    name: 'testplayername'
  },
  vote: 1,
  story: {
    _id: 'teststoryid',
    name: 'teststoryname'
  }
};
