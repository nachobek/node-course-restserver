// Node modules.


// 3rd party modules.
// const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

// Own modules.
const { generateJWT } = require('../helpers/generateJWT');
const User = require('../models/user');


// Controller development.

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify email (user) exists and is still active.
        const user = await User.findOne({email, state: true});

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }


        // Validate password.
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);


        return res.status(200).json({
            user,
            token
        });



    } catch (error) {
        console.log(error);

        return res.status(500).json({
            msg: 'System failure. Please contact the system administrator.'
        })
    }
}





module.exports = {
    login
}