const CryptoJS = require('crypto-js');
const User = require('../models/User');

const Register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS).toString(),
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
};
// eslint-disable-next-line consistent-return
const Login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        // eslint-disable-next-line no-unused-expressions
        !user && res.status(404).json('Wrong username');
        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS);
        const password = hashPassword.toString(CryptoJS.enc.Utf8);
        // eslint-disable-next-line no-unused-expressions
        password !== req.body.password && res.status(401).json('Wrong Credentials');
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports = {
    Register,
    Login,
};
