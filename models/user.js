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

// Overwriting the toJSON function, in order to hide/ fields to be returned for security/protection.
// After creating a new instance of this User object, when returning that instance, the below custom fields will be returned instead. That is, everything but "__v" and "password".
UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();

    return user;
}

module.exports = model('User', UserSchema);