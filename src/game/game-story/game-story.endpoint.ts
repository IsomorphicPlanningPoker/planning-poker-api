import * as express from 'express';
import { GameService } from '../game.service';
import { gameStoryVoteRouter } from './game-story-vote/game-story-vote.endpoint';

export const gameStoryRouter: express.Router = express.Router();

gameStoryRouter.post('/', (req, res) => {
  GameService.addStory(req.params.gameId, req.body.story)
      .then(res.end)
});

gameStoryRouter.put('/:storyId', (req, res) => {
  GameService.editStory(req.params.gameId, req.body.story)
      .then(res.end)
});

gameStoryRouter.use('/:storyId/votes', gameStoryVoteRouter);


