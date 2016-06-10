var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Story      = require('./story').schema;

var GameSchema   = new Schema({
    name: String,
    activeStory: String,
    stories: [Story],
    players: [{name: String}],
    owner: String
});

module.exports = mongoose.model('Game', GameSchema);
