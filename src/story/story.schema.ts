'use strict';

import * as mongoose from 'mongoose';
import { VoteSchema } from '../vote/vote.schema';

export const StorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  votes: [ VoteSchema ]
});
