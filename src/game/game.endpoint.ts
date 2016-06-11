import * as express from 'express';
import { GameService } from './game.service';
import { gameStoryRouter } from './game-story/game-story.endpoint';

export const gameRouter: express.Router = express.Router();

gameRouter.post('/', (req, res) => {
  GameService.createGame(req.body.game);
});

gameRouter.get('/:gameId', (req, res) => {
  GameService.getGame(req.params.gameId);
});

gameRouter.use('/:gameId/stories', gameStoryRouter);

