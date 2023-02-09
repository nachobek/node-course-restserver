// Node modules.



// 3rd party modules
// Extracting Router function from express.
const { Router } = require('express');
const { check } = require('express-validator');



// Own modules
// Importing usersGet Controller.
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users')



// Application development.

const router = Router();



// The path here is just "/" so it points to the root of our path already defined in server.js when importing this module, which is /api/users
// Replaced the callback function/controller with a controller defined in its own file users.js in the Controller directory.
// router.get('/', (req, res) => {
//     res.json({
//         verb: 'GET',
//         msg: 'Hello from /api/users'
//     });
// });

router.get('/', usersGet);
// --------------------------------------------------------------

// Adding mandatory parameters to the route. Any optional param "?" is already handled automatically by express.
router.put('/:id', usersPut);


// Adding middleware to the Post route.
// If more than one middleware is needed, they must be added as an array, in square brackets.
// The "check" middleware comes from express-validator package.
router.post('/', [
    check('email', 'Invalid email address').isEmail(),
], usersPost);

router.delete('/', usersDelete);

module.exports = router;