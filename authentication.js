const authModel = require('../mongoose_model/auth');

const jwtMod = require('jsonwebtoken');

const expressjwtMod = require('express-jwt');

const bcryptMod = require('bcrypt');

require('cookie-parser');

exports.signup = async (req, res) => {
    try {
        const { email, passwoed } = req.body;

        if (!(email && password)) {
            res.status(400).json("All input is required");
        }

        const existUser = await authModel.findOne({ email });

        if (existUser) {
            return res.status(409).json("User already exist, please login");
        }

        encryptedPassword = await bcryptMod.hash(password, 10);

        const userAuth = await authModel.create({
            email, password: encryptedPassword
        })

        res.status(200).json(userAuth);
    }

    catch (error) {
        res.status(400).json({
            error: "Please enter your email and password"
        })
    }
};