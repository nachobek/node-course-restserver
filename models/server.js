// Node modules

//3rd party modules
const express = require('express');
const cors = require('cors');

// Own modules
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // this.usersRoute = '/api/users'; // Defining the route as a field so it's easier to see and keep track of.
        // this.authRoute = '/api/auth';
        // this.categoriesRoute = '/api/categories';
        // this.productsRoute = '/api/products';

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            users:      '/api/users'
        }

        // Connect to the DB.
        this.dbConnect();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async dbConnect(){
        await dbConnection();
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
        this.app.use(this.paths.auth, require('../routes/auth'));

        this.app.use(this.paths.categories, require('../routes/categories'));

        this.app.use(this.paths.products, require('../routes/products'));


        // We can directly define the routes with all their logic in here using app.get()
        // this.app.get('/api', (req, res) => {
        //     res.json({
        //         verb: 'GET',
        //         msg: 'Hello from /api'
        //     });
        // });

        //Or define our main routes and point to an additional file with sub-routes, multiple verbs handler and additional middleware validation checks for a better organization.
        this.app.use(this.paths.users, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening at port:', this.port);
        });
    }
}

module.exports = Server;