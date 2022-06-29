const internModel = require('../model/internModel')
const validator = require ('../validator/validator')

const createIntern = async function (req,res){

    try {
    let internData = req.body
    if (!validator.isValidRequestBody(internData)){
        return res.status(400).send({status: false, msg: "invalid request body"})
    }

    let newIntern = await internModel.create(internData);
    return res.status(201).send({status: true, data: newIntern})
    }
    catch(error){
        res.status(500).send({status: false, msg: error.message})
    }
}

module.exports.createIntern = createIntern