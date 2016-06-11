import {Vote} from './../shared/vote/vote.interface';
import {Story} from './../shared/story/story.interface';
import {connection} from './../db';
import { Game } from '../shared/game/game.interface';
import { GameService } from './game.service';

describe('GameAPIService:', () => {

  beforeAll((done) => {
    connection.once('open', done)
  });

  afterAll((done) => {
    connection.db.dropDatabase(() => {
      connection.close(done);
    });
  });

  it('should add a new game', (done) => {

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name'
    };
    GameService.createGame(game).then((newGame) => {
      expect(newGame.name).toEqual('Test new game name');
      done();
    });
  });

  it('should get a game', (done) => {

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name'
    };

    GameService.createGame(game).then((newGame) => {
      GameService.getGame(newGame._id).then((foundGame) => {
        expect(foundGame.name).toEqual(game.name);
        done();
      });
    });
  });

  it('should add a story', (done) => {

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name'
    };

    let story: Story = {
      name: 'Test new story name'
    };

    GameService.createGame(game).then((newGame) => {
      return GameService.addStory(newGame._id, story).then((createdGame) => {
        expect(createdGame.stories[0].name).toEqual(story.name);
        done();
      })
    })
    .catch((err) => {
      console.log('******* ERROR *******', err);
      done(err);
    });
  });

  it('should edit a story', (done) => {

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name'
    };

    let story: Story = {
      name: 'Test new story name'
    };


    GameService.createGame(game).then((newGame) => {
      GameService.addStory(newGame._id, story).then((game) => {
        let editedStory = Object.assign({}, game.stories[0], {name: 'edited story name'});
        GameService.editStory(game._id, editedStory).then(() => {
          return GameService.getGame(newGame._id);
        })
        .then((gameWithStoryAdded) => {
          expect(gameWithStoryAdded.stories[0].name).toEqual(editedStory.name);
          done();
        });
      });
    });
  });

  it('should vote a story', (done) => {
    let story: Story = {
      name: 'Test new story name'
    };

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name',
      stories: [ story ]
    };


    let vote: Vote = {
      player: 'Test vote user',
      vote: 1
    };

    GameService.createGame(game).then((newGame) => {
        GameService.voteStory(newGame._id, newGame.stories[0]._id, vote)
        .then(() => {
          return GameService.getGame(newGame._id);
        })
        .then((gameWithStoryVoted) => {
          console.log('***chabon***', gameWithStoryVoted);
          expect(gameWithStoryVoted.stories[0].votes[0].vote).toEqual(1);
          done();
        })
    });
  });

  it('should change the vote on an existing story', (done) => {

    let vote: Vote = {
      player: 'Test vote user',
      vote: 1
    };

    let story: Story = {
      name: 'Test new story name',
      votes: [ vote ]
    };

    let game: Game = {
      name: 'Test new game name',
      owner: 'Test new game owner name',
      stories: [ story ]
    };

    GameService.createGame(game).then((newGame) => {
      let oldStory = newGame.stories[0];
      let oldVote = oldStory.votes[0];
      let changedVote = Object.assign({}, oldVote , { vote: 2 } );
      GameService.voteStory(newGame._id, oldStory._id, changedVote)
        .then(() => {
          return GameService.getGame(newGame._id);
        })
        .then((gameWithStoryVoted) => {
          expect(gameWithStoryVoted.stories[0].votes[0].vote).toEqual(2);
          done();
        });
    });
  })


});
