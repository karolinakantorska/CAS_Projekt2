const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// express middlware to handle cookies (JWT)
server.express.use(cookieParser());

// decode JWT to get user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (token) {
    // TODO make env work! process.env.APP_SECRET instead of 'jwtsecret1983'
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto the request for future requests to acces
    req.userId = userId;
  }
  next();
});
// Crete express middlware to populate current user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{ id, permissions, email, name }"
  );
  req.user = user;
  next();
});

server.start(
  // {
  // cors: {
  //   credentials: true,
  //   origin: process.env.FRONTEND_URL,
  // },
  //  },
  (deets) => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
