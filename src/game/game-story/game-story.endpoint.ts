import * as express from 'express';
import { GameAPIService } from '../game.api.service';
import { gameStoryVoteRouter } from './game-story-vote/game-story-vote.endpoint';

export const gameStoryRouter: express.Router = express.Router();

gameStoryRouter.post('/', (req, res) => {
  GameAPIService.addStory(req.params.gameId, req.body.story)
      .then(res.end)
});

gameStoryRouter.put('/:storyId', (req, res) => {
  GameAPIService.editStory(req.params.gameId, req.body.story)
      .then(res.end)
});

gameStoryRouter.use('/:storyId/votes', gameStoryVoteRouter);
