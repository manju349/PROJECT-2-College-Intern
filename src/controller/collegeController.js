const collegeModel = require ('../model/collegeModel');
const internModel = require('../model/internModel');
const validator = require ('../validator/validator')

const createColleges = async function (req,res){

    try {
    let collegeData = req.body;
    let newCollege = await collegeModel.create(collegeData);
    return res.status(201).send({status: true, data: newCollege})
    }
    catch (error){
        res.status(500).send ({status: false, msg: error.message})
    }
}


const getCollegeDetails = async function (req,res){
    let collegeName = req.query.collegeName
    let data = await collegeModel.findOne({name: collegeName}).select({name: 1, fullName: 1, logoLink: 1, _id:0})
    let interns = await internModel.find().select({_id:1, name: 1, email:1, mobile:1})
    res.send({status: true, data: {data, interns}})
}

module.exports.getCollegeDetails = getCollegeDetails
module.exports.createColleges = createColleges


