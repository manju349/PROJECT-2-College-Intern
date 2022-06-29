const collegeModel = require ('../model/collegeModel');
const internModel = require('../model/internModel');
const validator = require ('../validator/validator')

const createColleges = async function (req,res){

    try {
    let collegeData = req.body;
    
    // BODY VALIDATION
    if (!validator.isValidRequestBody(collegeData)){
        return res.send({status: false, msg: "college details required"})
    }

    // NAME VALIDATION
    if (!validator.isValidField(collegeData.name)){
        return res.send({status: false, msg: "Name is required"})
    }
    if (!validator.isValidName(collegeData.name)){
        return res.send({status: false, msg: "Name is not valid"})
    }

    let collegeName = await collegeModel.findOne({name: collegeData.name})
    if (collegeName){
        return res.send({status: false, msg: "This name already exists"})
    }

    // FULL NAME VALIDATION
    if (!validator.isValidField(collegeData.fullName)){
        return res.send({status: false, msg: "Full Name is required"})
    }
    if (!validator.isValidName(collegeData.fullName)){
        return res.send({status: false, msg: "Full Name is not valid"})
    }

    // LOGO LINK VALIDATION
    if (!validator.isValidField(collegeData.logoLink)){
        return res.send({status: false, msg: "Logo link is required"})
    }
    if (!validator.isValidURL(collegeData.logoLink)){
        return res.send({status: false, msg: "Logo Link is Invalid"})
    }

    // CREATE COLLEGE DATA
    let newCollege = await collegeModel.create(collegeData);
    return res.status(201).send({status: true, data: newCollege})
    }
    catch (error){
        res.status(500).send ({status: false, msg: error.message})
    }
}

// GET LIST OF INTERNS BY COLLEGE
const getCollegeDetails = async function (req,res){

        try {
            const collegeNames = req.query.collegeNames
            if (!collegeNames) return res.status(400).send({ status: false, message: 'College name is required to access data' })
    
            const newCollege = await collegeModel.findOne({ name: collegeNames, isDeleted: false });
            if (!newCollege) return res.status(404).send({ status: false, message: `College does not exit` });
    
    
            const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false }, { name: 1, email: 1, mobile: 1 });
            if (!interns) return res.status(404).send({ status: false, message: `Interns does not exit` });
         
    
            res.status(200).send({status: true, data: { name: newCollege.name, fullName: newCollege.fullName, logoLink: newCollege.logoLink, interests: interns } })
    
        } catch (error) {
            res.status(500).send({ status: false, message: error.message });
        }
    }


module.exports.getCollegeDetails = getCollegeDetails
module.exports.createColleges = createColleges


