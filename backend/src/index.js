const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// express middlware to handle cookies (JWT)
server.express.use(cookieParser());
// TODO Use express middlware to populate current user
// decode JWT to get user Id on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    console.log(token)
    if(token){
        // TODO make env work! process.env.APP_SECRET instead of 'jwtsecret1983'
        const { userId } = jwt.verify(token, "jwtsecret1983");
        // put userId onto the request for future requests to acces
        req.userId = userId;
    }
    next();
});

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