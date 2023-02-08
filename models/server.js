const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersRoute = '/api/users'; // Defining the route as a field so it's easier to see and keep track of.

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Read and parse body data into Json. Any data received via POST, PUT, etc will be serialized to Json.
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        // We can directly define the routes with all their logic in here using app.get()
        // this.app.get('/api', (req, res) => {
        //     res.json({
        //         verb: 'GET',
        //         msg: 'Hello from /api'
        //     });
        // });

        //Or define our routes and point to an additional file with all the business logic for a better organization.
        this.app.use(this.usersRoute, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening at port:', this.port);
        });
    }
}

module.exports = Server;
