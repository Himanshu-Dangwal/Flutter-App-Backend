const express = require("express");
const router = express.Router();
const {fetchUser} = require('../middlewares/fetchUser')
const {validateNewData} = require('../middlewares/validateNewData')
const {fetchAllData,addData,updateData,deleteData} = require('../controllers/data')
const catchAsync = require('../utils/catchAsync')


//Note
/*
    id in all routes refers to the data Id
*/

//Get all data
router.get('/', fetchAllData)

// Add new data using : POST /api/data/
router.post('/addData', fetchUser, validateNewData, catchAsync(addData))

// Update the blog using: PUT /api/data
router.put('/updateData/:id', fetchUser, validateNewData, catchAsync(updateData))

// Delete the blog using: PUT /api/data
router.delete('/deleteData/:id', fetchUser, catchAsync(deleteData))

module.exports = router