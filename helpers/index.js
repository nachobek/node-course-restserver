const dbValidation = require('./dbValidation');
const uploadFile = require('./uploadFile');
const generateJwt = require('./generateJwt');
const googleVerify = require('./googleVerify');


module.exports = {
    ...dbValidation,
    ...generateJwt,
    ...googleVerify,
    ...uploadFile
}