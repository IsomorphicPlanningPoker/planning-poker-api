'use strict';

import * as mongoose from 'mongoose';
import { StorySchema } from '../story/story.schema';

export const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  stories: [ StorySchema ]
});
