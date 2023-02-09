const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is mandatory.']
    },
    email: {
        type: String,
        required: [true, 'Email address is mandatory.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory.']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        // Validate that the given role is either one of the enum below:
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    googleLinked: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);