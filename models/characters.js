let mongoose = require('mongoose');

let characterSchema = new mongoose.Schema({
        CharacterName: String,
        level: Number,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'Characters' });

module.exports = mongoose.model('Characters', characterSchema);