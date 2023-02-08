// Importing the request and response "types" from express, so I can get autocomplete assistance from VS Code.
const { request, response } = require('express');

const usersGet = (req = request, res = response) => {

    // Can destructurize the query params into our desired variables and set up default values if a given argument is not given.
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

const usersPost = (req = request, res = response) => {
    const body = req.body;
    // const header = req.headers;
    const {host} = req.headers;

    res.status(201).json({
        verb: 'POST',
        msg: 'Hello from usersPost Controller',
        body,
        host
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