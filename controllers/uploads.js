// Node modules.

const { fileupload } = require("../helpers");


// 3rd party modules


// Own modules


// Controller development.

const fileUpload = async (req, res) => {
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: "No files to upload were found."
        });
    }

    try {
        const uploaedFileName = await fileupload(req.files, undefined, 'imgs');

        return res.json({
            file: uploaedFileName
        });
    } catch (msg) {
        res.status(400).json({msg});
    }
}


module.exports = {
    fileUpload
}