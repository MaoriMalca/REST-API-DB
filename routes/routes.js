const expressMod = require('express');

const routerMod = expressMod.Router();

const mysqlConnection = require('../SQLdb/connection');

const queryPromise = require('../SQLdb/queries_handler');

const axiosMod = require('axios');

require('dotenv').config();

// API endpoints

// Create data to database(POST htpp request) 
routerMod.post('/create', async (req, res) => {
    try {
        const { email, password, name, age, city } = req.body;

        if (!(email && password && name && age && city)) {
            return res.status(400).send('All inputs are required');
        }
        // Building the query
        const sql = 'INSERT INTO User (email, password, name, age, city) VALUES (?, ?, ?, ?, ?)';
        // Executing the query
        const userData = await queryPromise.queryPromise(sql, [email, password, name, age, city]);
        res.status(200).json({email, password, name, age, city});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Read all data from database(GET htpp request)
routerMod.get('/getAll', async (req, res) => {
    try {
        // Building the query
        const sql = 'SELECT * FROM User';
        // Executing the query
        const usersData = await queryPromise.queryPromise(sql);
        res.status(200).json(usersData);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read data from database by email(GET htpp request)
routerMod.get('/getByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // Building the query
        const sql = 'SELECT * FROM User WHERE email = ?';
        // Executing the query
        const userData = await queryPromise.queryPromise(sql, [email]);
        if (userData.length == 0) {
            res.status(404).json({ message: 'No matching user found' })
        }
        else {
            res.status(200).json(userData[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

// Read specific user's city weather - by email(GET htpp request)
routerMod.get('/getWeatherByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // Building the query
        const sql = 'SELECT * FROM User WHERE email = ?';
        // Executing the query
        const userData = await queryPromise.queryPromise(sql, [email]);
        if (userData.length == 0) {
            return res.status(404).json({ message: 'No matching user found' });
        }
        // Make a GET request to the external weather API
        const response = await axiosMod.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${userData[0].city}`);
        // Extract relevant data from the response
        const weatherData = {
            temperature: response.data.current.temp_c,
            condition: response.data.current.condition.text,
        };
        res.status(200).json(
            {
                'city': userData[0].city,
                'temperature': weatherData.temperature,
                'message': weatherData.condition
            });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update data in database by email(PUT htpp request)
routerMod.put('/updateByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { password, name, age, city } = req.body;
        if (!(email && password && name && age && city)) {
            return res.status(400).send('All inputs are required');
        }
        // Building the query
        const sql = 'UPDATE User SET password = ?, name = ?, age = ?, city = ? WHERE email = ?';
        // Executing the query
        const NewUserData = await queryPromise.queryPromise(sql, [password, name, age, city, email]);
        if (NewUserData.affectRows == 0) {
            res.status(404).json({ message: 'Unable to update' });
        }
        else {
            res.status(200).json(NewUserData[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

// Delete data from database by email(DELETE htpp request)
routerMod.delete('/deleteByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;
        // Building the query
        const sql = 'DELETE FROM User WHERE email = ?';
        // Executing the query
        const results = await queryPromise.queryPromise(sql, [email]);
        if (results.affectRows == 0) {
            res.status(404).json({ message: 'No matching user found' })
        }
        else {
            res.status(200).json({ message: 'Successfuly deleted the user' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }); // 5xx code - the server failed to fulfil an apparently valid request
    }
});

module.exports = routerMod;
