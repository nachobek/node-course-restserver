const Role = require('../models/role');
const User = require('../models/user');


// Custom validators.

const roleValidation = async (role = '') => {
    const roleExists = await Role.findOne({role}); // Same as: .findOne({role: role});
    if (!roleExists) {
        throw new Error('Invalid role'); // This throw will not halt the application. It will rather add the error to the list of errors collected by the check() middleware.
    }
}

const emailValidation = async (email) => {
    const emailExists = await User.findOne({email: email}); // Same as doing: .findOne({email});

    if (emailExists) {
        throw new Error('Email already exists');
    }}

module.exports = {
    roleValidation,
    emailValidation
}