const dbValidation = require('./dbValidation');
const fileUpload = require('./fileUpload');
const generateJwt = require('./generateJwt');
const googleVerify = require('./googleVerify');


module.exports = {
    ...dbValidation,
    ...fileUpload,
    ...generateJwt,
    ...googleVerify
}