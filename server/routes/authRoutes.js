
const express = require('express');

const authRoute = express.Router();

const {signUp , login  , session} = require('../controllers/auth');
const {auth} = require('../middleware/auth');

// routes for login and signup
authRoute.post('/signup' , signUp);
authRoute.post('/login' , login);
authRoute.get('/session', auth, session);

module.exports= authRoute