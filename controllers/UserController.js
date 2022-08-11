const CryptoJS = require('crypto-js');
const User = require('../models/User');

function encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString();
}
function decryptPassword(password) {
    const hashedPassword = CryptoJS.AES.decrypt(password, process.env.SECRET_PASS);
    return hashedPassword.toString(CryptoJS.enc.Utf8);
}

const Register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: encryptPassword(req.body.password),
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const Login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            // throw new Error('Wrong credentials!');
            res.status(401).json('Wrong credentials!');
        } else {
            const OriginalPassword = decryptPassword(user.password);
            if (OriginalPassword !== req.body.password) {
                res.status(401).json('Wrong credentials!');
            } else {
                res.status(200).json(user);
            }
        }
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    Register,
    Login,
};
