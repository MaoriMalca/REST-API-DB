require('dotenv').config();

const expressMod = require('express');

const mongooseMod = require('mongoose');

const mongoString = process.env.DATABASE_URL;

//DB connection
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

const expressApp = expressMod();

expressApp.use(expressMod.json());

const routerMod = require('./routes/routes');

//Route Prefix
expressApp.use('/api', routerMod);

expressApp.listen(5000, () => {
    console.log("Server is running on port 5000");
});

