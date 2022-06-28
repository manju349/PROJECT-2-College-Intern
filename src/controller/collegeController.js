const collegeModel = require ('../model/collegeModel')

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

module.exports.createColleges = createColleges


