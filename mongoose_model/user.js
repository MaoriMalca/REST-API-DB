const mongooseMod = require('mongoose');

const dataSchema = new mongooseMod.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

module.exports = mongooseMod.model('User', dataSchema);
