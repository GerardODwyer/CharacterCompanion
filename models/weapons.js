let mongoose = require('mongoose');

let weaponSchema = new mongoose.Schema({
        WeaponName: String,
        PowerBonus: Number,
        Design: String,
    },
    { collection: 'Weapons' });

module.exports = mongoose.model('weapons', weaponSchema);

