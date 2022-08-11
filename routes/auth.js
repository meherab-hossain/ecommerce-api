const router = require('express').Router();

const { Register, Login } = require('../controllers/UserController');

// register routes

router.post('/register', Register);
router.post('/login', Login);

module.exports = router;
