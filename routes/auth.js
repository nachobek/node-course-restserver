// Node modules.


// 3rd party modules
// Extracting Router function from express.
const { Router } = require('express');
const { check } = require('express-validator');


// Own modules
const { login } = require('../controllers/auth');
const { paramsValidation } = require('../middlewares/paramsValidation');


// Routes development.

const router = Router();


router.post("/login", [
    check('email', 'Email is mandatory').not().isEmpty(),
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    paramsValidation
], login );


module.exports = router;