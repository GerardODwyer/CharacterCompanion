let weapons = require('../models/weapons');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let uriUtil = require('mongodb-uri');


var mongodbUri ="mongodb+srv://Gerard:Firedrake77@wit-charactercompanion-cluster-rs4nt.mongodb.net/CharacterCompanion?retryWrites=true&w=majority"

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAllWeapons = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    weapons.find(function(err, weapons) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(weapons,null,5));
    });
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}
router.findOneWeapon = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    weapons.find({ "_id" : req.params.id },function(err, weapon) {
        if (err)
            res.json( 'this weapon can not be found are you sure this is correct?'  );
        else
            res.send(JSON.stringify(weapon,null,5));
    });
}

router.addWeapon = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    let weapon = new weapons();

    weapon.WeaponName =  req.body.WeaponName;
    weapon.PowerBonus =  req.body.PowerBonus;
    weapon.Design =  req.body.Design;

    weapon.save(function(err) {
        if (err)
            res.json( 'this weapon was not  added there may be an error!'  );
        else
            res.json({message: 'Weapon Successfully Added!', data: weapon });
    });
}

router.deleteWeapon = (req, res) => {

    weapons.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'this weapon was not deleted there is an error', errmsg : err } );
        else
            res.json({ message: 'this weapon was deleted '});
    });
}

module.exports = router;
