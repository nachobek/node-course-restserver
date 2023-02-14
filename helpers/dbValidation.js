const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');


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
    }
}

const userValidationById = async (id) => {
    const userExists = await User.findById(id);

    if (!userExists) {
        throw new Error('User not found with given ID');
    }
}

const userIsActiveById = async (id) => {
    const userIsActive = await User.findOne({_id: id, state: true});

    if (!userIsActive) {
        throw new Error('No Active user found with given ID');
    }
}

const paginationValidation = async (number = "") => {
    if (number != "") {
        if (number < 0 || !Number.isInteger(Number(number))) {
            throw new Error('Invalid pagination argument');
        }
    }
}

const categoryExists = async (categoryId) => {
    const category = await Category.findOne({_id: categoryId, active: true});

    if (!category) {
        throw new Error('No Active Category found with given ID');
    }
}

const isCategoryUnique = async (categoryName) => {
    const category = await Category.findOne({name: categoryName});

    if (category) {
        throw new Error(`Category Name ${categoryName} already exists`);
    }
}

module.exports = {
    roleValidation,
    emailValidation,
    userValidationById,
    paginationValidation,
    userIsActiveById,
    categoryExists,
    isCategoryUnique
}