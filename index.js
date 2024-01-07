// Creating an Express server
const expressMod = require('express');

const routerMod = require('./routes/routes');

const expressApp = expressMod();

expressApp.use(expressMod.json());

expressApp.use('/api', routerMod); //Route Prefix

expressApp.listen(5000, () => {
    console.log('Server is running on port 5000');
});
