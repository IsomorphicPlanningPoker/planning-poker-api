var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StorySchema   = new Schema({
    name: String,
    votes: [{player: String, vote: Number}],
    flipped: {
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('Story', StorySchema);
