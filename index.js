const mongooseMod = require('mongoose');

require('dotenv').config();

const mongoString = process.env.DATABASE_URL;

// DB connection
mongooseMod.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
});

const database = mongooseMod.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

// Creating an Express server
const expressMod = require('express');

const routerMod = require('./routes/routes');

const expressApp = expressMod();

expressApp.use(expressMod.json());

expressApp.use('/api', routerMod); //Route Prefix

expressApp.listen(5000, () => {
    console.log('Server is running on port 5000');
});

