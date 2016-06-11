import * as express from 'express';
import { GameAPIService } from './game.api.service';
import { gameStoryRouter } from './game-story/game-story.endpoint';

export const gameRouter: express.Router = express.Router();

gameRouter.post('/', (req, res) => {
  GameAPIService.createGame(req.body.game);
});

gameRouter.get('/:gameId', (req, res) => {
  GameAPIService.getGame(req.params.gameId);
});

gameRouter.use('/:gameId/stories', gameStoryRouter);
