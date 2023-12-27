const mongooseMod = require('mongoose');

const authSchema = new mongooseMod.Schema({
    email: { type: String, uniqe: true, required: true },
    password: { type: String, required: true },
    token: { type: String }
});

module.exports = mongooseMod.model('Auth', authSchema);