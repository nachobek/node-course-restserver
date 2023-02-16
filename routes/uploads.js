// Node modules.


// 3rd party modules
const {Router} = require('express');
const {check} = require('express-validator');


// Own modules
const { paramsValidation } = require('../middlewares');
const { fileUpload } = require('../controllers/uploads');


// Route development.

const router = Router();

router.post('/', fileUpload);


module.exports = router;