const mongooseMod = require('mongoose');

const authSchema = new mongooseMod.Schema({
    emmail: { type: String, uniqe: true, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true }
});

module.exports = mongooseMod.model('Auth', authSchema);