const authModel = require('./mongoose_model/auth');

const jwtMod = require('jsonwebtoken');

const { expressjwt: expressJwtMod } = require('express-jwt');

const bcryptMod = require('bcrypt');

require('cookie-parser');

require('dotenv').config();

const secret_key = process.env.JWT_SECRET;

exports.isSignedIn = expressJwtMod({
    secret: secret_key,
    userProperty: 'auth',
    algorithms: ['HS256'],
});

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const existUser = await authModel.findOne({ email });

        if (existUser) {
            return res.status(409).json("User already exist, please login");
        }

        const encryptedPassword = await bcryptMod.hash(password, 10);

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

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authModel.findOne({ email });

        if (!user) {
            return res.json({ status: "error", error: "Invalid username/password" })
        }

        const passwordCompare = await bcryptMod.compare(password, user.password);

        if (passwordCompare) {
            const token = jwtMod.sign({
                id: user._id,
                email: user.email
            }, secret_key
                , {
                    expiresIn: 86400 // expires in 24 hours
                })
            return res.json({ user, token })
        }

        else {
            return res.json({ status: "error", error: "Insert correct password again" })
        }
    }
    catch (error) {
        console.log(error);
    }
};

