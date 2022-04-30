const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, checkUser, logout } = require('../controllers/userControllers');

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.get('/checkUser', checkUser);
router.get('/logout', logout);


module.exports = router;