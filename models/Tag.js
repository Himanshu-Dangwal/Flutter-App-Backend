const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Data = require('./Data')

const { boolean } = require('joi');


const tagsSchema = new Schema({
    categoryName : String,
    category :[
        {
            type: mongoose.Schema.Types.ObjectId, // Blog post Id
            ref: 'Data',
        },
    ]
});

module.exports = mongoose.model('Tag', tagsSchema);

