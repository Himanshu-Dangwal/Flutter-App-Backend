const express = require("express");
const router = express.Router();
const {fetchUser} = require('../middlewares/fetchUser')
const {validateNewData} = require('../middlewares/validateNewData')
const {fetchAllDataUser,addData,updateData,deleteData} = require('../controllers/data')
const catchAsync = require('../utils/catchAsync')

//Fetch all data points of a user
router.get('/', fetchUser, catchAsync(fetchAllDataUser))

//Add data 
router.post('/addData', fetchUser, validateNewData, catchAsync(addData))

// Update the data using: PUT /api/data
router.put('/updateData/:id', fetchUser, validateNewData, catchAsync(updateData))

// Delete the data using: PUT /api/data
router.delete('/deleteData/:id', fetchUser, catchAsync(deleteData))

module.exports = router