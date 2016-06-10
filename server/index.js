var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('lodash');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Iganiq8o'); // connect to our database
var Game     = require('./models/game');
var Story     = require('./models/story');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.get('/games', function(req, res) {
  Game.find({}, (err, games) => {
    if (err) throw new Error(err);

    res.status(200).json(games);
  })
})

app.get('/games/:id', function(req, res) {
  Game.findOne({}, (err, games) => {
    if (err) throw new Error(err);

    res.status(200).json(games);
  })
})

app.post('/games', function(req, res) {
  var game = new Game({
    name: req.body.name,
    activeStory: '',
  });

  console.log(req.body);
  game.save(function(err, game){
    if (err)
    throw new Error(err);
    gameRooms[game._id] = io.of('/' + game._id);
    addRoomActions(gameRooms[game._id]);
    res.status(200).json(game);
  });
})

var gameRooms = [];

app.get('/login', function(req, res) {

  Game.findOne({_id: req.query.gameId}, function(err, game) {
    if (err) throw new Error(err);
    console.log(game.owner);
    if(game.owner === undefined) {
      game.owner = req.query.name;
    }

    game.players.push({name: req.query.name});

    game.save();
    if(gameRooms[game._id] == undefined) {
      gameRooms[game._id] = io.of('/' + game._id);
      addRoomActions(gameRooms[game._id]);
    }

    if (game.owner !== req.query.name)
    gameRooms[game._id].emit('new_player', req.query.name);

    res.status(200).json(game);
  })
});


var allClients = {};
var activeStory = '';

function addRoomActions(socketIoConnection) {

  socketIoConnection.on('connection', socket => {
    allClients[socket.id] = socket.handshake.query.name;
    console.log('a user connected');

    socket.on('new_story', info => {
      //get game
      console.log(info);
      var story = new Story({
        name: info.name
      });
      Game.findByIdAndUpdate(
        info.gameId,
          {$push: {'stories': story,},
           $set: {'activeStory': info.name}}, {new: true},

        (err, game) => {
          if (err) throw new Error(err);
          socketIoConnection.emit('new_story', {story, gameId: info.gameId});
        }
      );
    });

    socket.on('select_story', name => {
      Game.findByIdAndUpdate(
        socketIoConnection.name.substring(1),
        {$set: {activeStory: name}},
        (err, game) => {
          if (err) throw new Error(err);
          socketIoConnection.emit('select_story', name);
        }
      )
    });

    socket.on('flip', () => {
      Game.findOne(
        {_id: socketIoConnection.name.substring(1)},
        (err, game) => {
          if (err) throw new Error(err);
          console.log(game.activeStory);
          console.log(game.stories);
          var story = _.find(game.stories, {name: game.activeStory});

          story.flipped = true;
          game.save();

          socketIoConnection.emit('flip');
        }
      )
    });

    socket.on('vote_story', info => {
      //get game

      Game.findOne({_id: socketIoConnection.name.substring(1)}, function(err, game) {
        if(err) throw new Error(err);

        var story = (_.find(game.stories, {name: info.story.name}));

        var vote = _.find(story.votes, {player: allClients[socket.id]});

        if(!_.isUndefined(vote)) {
          vote.vote = info.point;
        } else {
          story.votes.push({player: allClients[socket.id], vote: info.point});
        }

        game.save();

        socketIoConnection.emit('vote_story', {point: info.point, userName: allClients[socket.id]});
      });
    });

    socket.on('disconnect', () => {
      Game.findByIdAndUpdate(
        socketIoConnection.name.substring(1),
        {$pull: {'players': {name: allClients[socket.id]}}},

        (err, game) => {
          if (err) throw new Error(err);
          socketIoConnection.emit('player_left', allClients[socket.id]);
        }
      );
    })
  });
}

http.listen(3001, function(){
  console.log('listening on *:3001');
});
