const mongoose = require('mongoose');

const cabinetItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    userId: { type: String, required: true}
});

const CabinetItem = mongoose.model('CabinetItem', cabinetItemSchema);

module.exports = CabinetItem;