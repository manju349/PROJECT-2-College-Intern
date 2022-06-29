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
        try {
            const collegeName = req.query.collegeName
            if (!collegeName) return res.status(400).send({ status: false, message: 'College name is required to access data' })
    
            const newCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false });
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


