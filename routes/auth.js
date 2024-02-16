const express = require("express");
const {createUser, loginUser, getUser} = require('../controllers/auth')
const {fetchUser} = require('../middlewares/fetchUser')
const {validateUserRegister} = require('../middlewares/validateUserRegister')
const {validateUserLogin} = require('../middlewares/validateUserLogin')
const catchAsync = require('../utils/catchAsync')


const router = express.Router()

// Create a new user using: POST /api/auth/createuser "no login required"
router.post('/createuser', validateUserRegister, catchAsync(createUser))

// authenticate a user using: POST /api/auth/login "no login required"
router.post('/login', validateUserLogin, catchAsync(loginUser))

// get logged in user details using: POST /api/auth/getuser "login required"
router.get('/getuser',fetchUser, catchAsync(getUser))

module.exports = router

//Auth Toke Format : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZDUzYWZlZjE4MzRlMjQ4ZjlkNDZjIn0sImlhdCI6MTY5NjQyMDg1Nn0.jLo-OHJdhYs6blxIfryfUpJRNWeTHtfKnpgbWjbkaGI