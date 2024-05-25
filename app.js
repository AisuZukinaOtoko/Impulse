var express = require('express');
const { spawn } = require("child_process");
var indexRouter = require("./routes/index.js");
const { auth } = require('express-openid-connect');
const cors = require('cors');
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

app.use(cors());
app.use('/', indexRouter);
app.use('/api', require("./api/users/users.js"));
app.use('/api', require("./api/timesheets/timesheets.js"));
app.use('/api', require("./api/feedback/feedback.js"));
app.use('/api', require("./api/meals/meals.js"));
app.use('/api', require("./api/projects/projects.js"));
app.use('/api', require("./api/carwash/carwash.js"));

app.get("/run-python", (req, res) => {
  const pythonProcess = spawn("python", ["public/python/model.py"]);

  pythonProcess.stdout.on("data", (data) => {
      const result = JSON.parse(data.toString());
      let carCount = 0;
      result.predictions.forEach(prediction => {
          if (prediction.class === 'Car' && prediction.confidence > 0.68) {
              carCount++;
          }
      });
      res.json({ carCount: carCount });
  });

  pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
      if (code !== 0) {
          console.log(`Python process exited with code ${code}`);
      }
  });
});


app.listen(port, () => {
    console.log('Express is running on port 3000');

  const url = process.env.BASEURL + "/api/users";
  // fetch(url)
  // .then((response) => {
  //   return response.json();  
  // })
  // .then((data) => {
  //   console.log(data);
  // })
});

module.exports =app