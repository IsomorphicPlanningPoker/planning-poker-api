'use strict';

import * as mongoose from 'mongoose';

export const VoteSchema = new mongoose.Schema({
  player: {
    type: String,
    required: true
  },
  vote: {
    type: Number,
    required: true
  }
});
