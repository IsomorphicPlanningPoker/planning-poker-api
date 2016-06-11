import * as express from 'express';
import { GameService } from '../../game.service';

export const gameStoryVoteRouter: express.Router = express.Router();

function responseHandler(req, res) {
  GameService.voteStory(req.params.gameId, req.params.storyId, req.body.vote)
      .then(res.end);
}

gameStoryVoteRouter.post('/', responseHandler);

gameStoryVoteRouter.put('/:voteId', responseHandler);



