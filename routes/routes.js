const expressMod = require('express');

const routerMod = expressMod.Router();

const userModel = require('../mongoose_model/user');

const authMod = require('../authentication');

const { isSignedIn } = require('../authentication');

//create data to database(POST htpp request) and register to api 
routerMod.post('/signup', authMod.signup);

//create data to database(POST htpp request) without auth
routerMod.post('/signin', authMod.signin);

//testing specific protected route
routerMod.get('/testAuthRoute', authMod.isSignedIn, (req, res) => {
    res.send("A protected route");
    res.json(req.auth);
});

//Apply isSignedIn middleware to all routes below this line
routerMod.use(isSignedIn);

//create data to database(POST htpp request) without auth
routerMod.post('/post', async (req, res) => {
    const user = new userModel(
        {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age
        });

    try {
        const userToSave = await user.save();
        res.status(200).json(userToSave);
    }

    catch (error) {
        res.status(400).json({ message: error.message }); //4xx code - the request contains bad syntax or cannot be fulfilled
    }
});

//read all data from database(GET htpp request)
routerMod.get('/getAll', async (req, res) => {
    try {
        const usersData = await userModel.find();
        res.status(200).json(usersData);
    }

    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

//read data from database by id(GET htpp request)
routerMod.get('/getByID/:id', async (req, res) => {
    try {
        const userData = await userModel.findById(req.params.id);
        res.status(200).json(userData);
    }

    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

//update data in database by id(PUT htpp request)
routerMod.patch('/updateByID/:id', async (req, res) => {
    try {
        const userToUpdt = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(userToUpdt);
    }
    catch (error) {
        res.status(400).json({ message: error.message }); //4xx code - the request contains bad syntax or cannot be fulfilled
    }
});

//delete data from database by id(DELETE htpp request)
routerMod.delete('/deleteByID/:id', async (req, res) => {
    try {
        const userToDel = await userModel.findByIdAndDelete(req.params.id);
        res.send(`Document with ${userToDel.name} has been deleted`);
    }

    catch (error) {
        res.status(400).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

module.exports = routerMod;
