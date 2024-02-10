const secretKey = "HimanshuDangwal"
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config();
const URI = process.env.URI || "http://localhost:8080"


module.exports.createUser = async (req, res) => {
    const { username, email, password } = req.body
    const user = new User({ username, email, password })
    const resp = await user.save()
    const data = {
        user: { id: user._id }
    }
    // console.log(process.env.SECRET);
    res.status(201).json({ success: true, user: resp })
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        const data = {
            user: { id: foundUser._id }
        }
        const authToken = jwt.sign(data, secretKey)
        res.status(201).json({ success: true, authToken })
    } else {
        res.status(400).json({message : "Invalid credentials"})
    }
}

module.exports.getUser = async (req, res) => {
    const userId = req.user.id
    console.log(userId);
    const user = await User.findById(userId).select("-password")
    console.log(user);
    res.status(201).json(user)
}



