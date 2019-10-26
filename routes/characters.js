let characters = require('../models/characters');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ="mongodb+srv://Gerard:Firedrake77@wit-charactercompanion-cluster-rs4nt.mongodb.net/CharacterCompanion?retryWrites=true&w=majority"

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});


router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    characters.find(function(err, characters) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(characters,null,5));
    });
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    characters.find({ "_id" : req.params.id },function(err, character) {
        if (err)
            res.json( 'this character can not be found are you sure this is correct?'  );
        else
            res.send(JSON.stringify(character,null,5));
    });
}
function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}
router.addCharacter = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let character = new characters();

    character.CharacterName =  req.body.CharacterName;
        character.level =  req.body.level;

            character.save(function(err) {
                if (err)
                    res.json( 'this character was not  added there may be an error!'  );
                else
                    res.json({message: 'Character Successfully Added!', data: character });
            });
}
router.findTotalVotes = (req, res) => {

    characters.find(function(err, donations) {
        if (err)
            res.send(err);
        else
            res.json({ totalvotes : getTotalVotes(donations) });
    });
}

router.incrementUpvotes = (req, res) => {

    characters.findById(req.params.id, function(err,character) {
        if (err)
            res.json({ message: 'this character dose not exist', errmsg : err } );
        else {
            character.upvotes += 1;
            character.save(function (err) {
                if (err)
                    res.json({ message: 'this character cant be upvoted', errmsg : err } );
                else
                    res.json({ message: 'character got an upvote', data: character});
            });
        }
    });
}

router.deleteCharacter = (req, res) => {

    characters.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'this character was not deleted there is an error', errmsg : err } );
        else
            res.json({ message: 'this character was deleted '});
    });
}

module.exports = router;
