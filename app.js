var express = require('express');
var indexRouter = require("./routes/index.js");
const { auth } = require('express-openid-connect');
require('dotenv').config()
const port = process.env.PORT || 3000;


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
  };

var app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
// app.use(express.static('./views'));
app.use(auth(config));

app.use((req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', indexRouter);

app.listen(port, () => {
    console.log('Express is running on port 3000');
});