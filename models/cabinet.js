const mongoose = require('mongoose');

const cabinetItemSchema = new mongoose.Schema({
    itemName: String ,
    userId: String
});

const CabinetItem = mongoose.model('CabinetItem', cabinetItemSchema);

module.exports = CabinetItem;