// let's go!
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middlware to handle cookies (JWT)
// TODO Use express middlware to populate current user

server.start(
    {
        cors: {
            credentials: true,
            origin: 'http://localhost:3000',
        },
    },
    deets => {
        console.log(`Server is now running on port http:/localhost:${deets.port}`);
    }
);