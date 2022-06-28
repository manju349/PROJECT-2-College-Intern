const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : "College name must be present",
        trim: true
    },
    fullName : {
        type : String,
        required : "Please provide full name of college",
        trim: true
    },
    logoLink : {
        type : String,
        required : "URL of logo must be present",
        trim: true
    },
    isDeleted : {
        type : Date,
        default : false
    }
}, {timestamps:true} )

module.exports = mongoose.model("College", collegeSchema)