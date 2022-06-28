const express = require ('express')
const router = express.Router();
const collegeController = require ('../controller/collegeController')
const internController = require ('../controller/internController')

router.post ('/functionup/colleges', collegeController.createColleges)
router.post  ('/functionup/interns', internController.createIntern)
router.get ('/functionup/collegeDetails', collegeController.listOfInterns)


module.exports = router