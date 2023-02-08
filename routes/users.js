// Extracting Router function from express.
const { Router } = require('express');

const router = Router();


// Importing usersGet Controller.
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users')

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

router.post('/', usersPost);

router.delete('/', usersDelete);

module.exports = router;