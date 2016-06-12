import * as express from 'express';
import { GameAPIService } from '../../game.api.service';

export const gameStoryVoteRouter: express.Router = express.Router();

function responseHandler(req, res) {
  GameAPIService.voteStory(req.params.gameId, req.params.storyId, req.body.vote)
      .then(res.end);
}

gameStoryVoteRouter.post('/', responseHandler);

gameStoryVoteRouter.put('/:voteId', responseHandler);
