// Node modules.


// 3rd party modules.
// Importing the request and response "types" from express, so I can get autocomplete assistance from VS Code.
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
// const { validationResult } = require('express-validator'); // No longer needed since it's been moved to paramsValidation.js


// Own modules.
const User = require('../models/user');


//UsersController.

const usersGet = (req = request, res = response) => {

    // Can destructure the query params into our desired variables and set up default values if a given argument is not given.
    const {q, name = 'No Name', page = '1', limit = '10'} = req.query;

    res.json({
        verb: 'GET',
        msg: 'Hello from usersGet Controller',
        q,
        name,
        page,
        limit
    });
}

const usersPut = (req = request, res = response) => {
    const userId = req.params.id;

    res.json({
        verb: 'PUT',
        msg: 'Hello from usersPut Controller',
        idGiven: userId
    });
}

const usersPost = async (req = request, res = response) => {
    // Get the errors identified by "check()" middleware from express-validator.
    // Return BadRequest if any error was identified.
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     return res.status(400).json(errors);
    // }


    // const header = req.headers;
    // const {host} = req.headers;

    // const body = req.body;
    // Createnew constant (User instance) passing the body's data. Moongose will automatically assign the keys/attributes received that match the User model.
    // const user = new User(body);


    // Even though I could get the entire body and let mongoose update the matching fields only. This could lead to updating data we should not receive from the client.
    // Therefore we'll only get the key/value pairs we need from the body using destructuring.
    const { name, email, password, image, role } = req.body;

    const user = new User({name, email, password, image, role});


    // Verify if email already exists. --> This is moved to dbValidation.js
    // const emailExists = await User.findOne({email: email}); // Same as doing: .findOne({email});

    // if (emailExists) {
    //     return res.status(400).json({
    //         message: "Email already exists"
    //     });
    // }


    //Encrypt password.
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    // Add data to the DB. 
    //TODO: Add try-catch, else the app will crash with invalid data.
    await user.save();

    res.status(201).json({
        verb: 'POST',
        msg: 'Hello from usersPost Controller',
        user // Here user is an instance of User. It will return only the fields we selected in the overwritten method toJSON() in the user.js Model.
    });
}

const usersDelete = (req = request, res = response) => {
    res.json({
        verb: 'DELETE',
        msg: 'Hello from usersDelete Controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}