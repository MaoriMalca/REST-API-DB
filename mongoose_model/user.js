const mongooseMod = require('mongoose');

const dataSchema = new mongooseMod.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    role : {type: String, enum: ['admin', 'user'], default: 'user', required: true },
    token: { type: String }
});

module.exports = mongooseMod.model('User', dataSchema);
