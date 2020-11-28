const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true   
    },
    author_img: {
        type: String,
        required: true       
    },
    blog_text: {
        type: String,
        required: true      
    },
    date_visited: {
        type: Date,
        required: true      
    },
    place_img: {
        type: String,
        required: true      
    },
    published_date: {
        type: Date,
        required: true,
        default: Date.now 
    } 

})

module.exports = mongoose.model('Blog', blogSchema)