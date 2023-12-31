const expressMod = require('express');

const routerMod = expressMod.Router();

const userModel = require('../mongoose_model/user');

const authMod = require('../auth');

const { isSignedIn } = require('../auth');

const axiosMod = require('axios');

const WEATHER_API_KEY = 'e3594dbdc5e14acc9b3150924232712';

// API endpoints

// Create data to database(POST htpp request) and register to api 
routerMod.post('/signup', authMod.signup);

// Signin to api after register (recieve token for authorization)
routerMod.post('/signin', authMod.signin);

// Apply isSignedIn middleware to all routes below this line
routerMod.use(isSignedIn);

// Create data to database(POST htpp request) without auth
routerMod.post('/post', async (req, res) => {
    const user = new userModel(
        {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            age: req.body.age,
            city: req.body.city
        });

    try {
        const userToSave = await user.save();
        res.status(200).json(userToSave);
    }

    catch (error) {
        res.status(400).json({ message: error.message }); //4xx code - the request contains bad syntax or cannot be fulfilled
    }
});

//Read all data from database(GET htpp request)
routerMod.get('/getAll', async (req, res) => {
    try {
        const usersData = await userModel.find();
        res.status(200).json(usersData);
    }

    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

// Read data from database by id(GET htpp request)
routerMod.get('/getByID/:id', async (req, res) => {
    try {
        const userData = await userModel.findById(req.params.id);
        res.status(200).json(userData);
    }

    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

// Read specific user's city weather - by id(GET htpp request)
routerMod.get('/getWeatherByID/:id', async (req, res) => {
    try {
        const userData = await userModel.findById(req.params.id); 
        // Make a GET request to the external weather API
        const response = await axiosMod.get(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${userData.city}`);
        // Extract relevant data from the response
        const weatherData = {
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
        };
        res.status(200).json(
            {
                'city': userData.city,
                'temperature': weatherData.temperature,
                'message': weatherData.condition
            });
        }

        catch (error) {
            res.status(500).json({ error: error.message });
        }
});

// Update data in database by id(PUT htpp request)
// if update email or password - must regsiter again
routerMod.patch('/updateByID/:id', async (req, res) => {
    try {
        const userToUpdt = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(userToUpdt);
    }
    catch (error) {
        res.status(400).json({ message: error.message }); //4xx code - the request contains bad syntax or cannot be fulfilled
    }
});

// Delete data from database by id(DELETE htpp request)
routerMod.delete('/deleteByID/:id', async (req, res) => {
    try {
        const userToDel = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send(`Document with ${userToDel.name} has been deleted`);
    }

    catch (error) {
        res.status(400).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

module.exports = routerMod;
