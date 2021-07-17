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
  if (token) {
    const { userId, userPermission } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto the request
    req.userId = userId;
    req.userPermission = userPermission;
  }
  next();
});
server.express.use(function(req, res, next) {
  // for deployment
  //res.header("Access-Control-Allow-Origin", "https://mtb.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.FRONTEND_URL_VERCEL,process.env.FRONTEND_URL],
    },
  },
  (deets) => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
