// users.js
var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate');

router.get('/users', (req, res) => {
    dbRequest("SELECT * FROM dbo.users")
        .then((data) => {
            res.json(data);
        });
});

router.get('/users/:email', (req, res) => {
    const { email } = req.params;
    if (!email) {
        res.status(400).send("An error occurred.");
        return;
    }

    let query = "SELECT * FROM dbo.users WHERE email = '" + email + "'";
    dbRequest(query)
        .then((response) => {
            res.status(200).json(response);
        });
});

router.post('/users', (req, res) => {
    const { Name, LastName, email, permissions, phoneNo } = req.body;

    verify(Name, LastName, email, permissions, phoneNo, res);

    let query = "INSERT INTO dbo.users VALUES ('" + Name + "', '" + LastName + "', '" + email + "', " + permissions + ", N'" + phoneNo + "')";
    console.log(query);
    dbRequest(query)
        .then((response) => {
            res.status(200).json(response);
        });
});

router.delete('/users/delete/:email', (req, res) => {
    const { email } = req.params;
    if (!email) {
        res.status(400).send("An error occurred.");
        return;
    }

    let query = "DELETE FROM dbo.users WHERE email = '" + email + "'";
    dbRequest(query)
        .then((response) => {
            res.status(200).json(response);
        });
});

function verify(Name, LastName, email, permissions, phoneNo, res) {
    if (!Name || !LastName || !email || permissions === undefined || !phoneNo) {
        res.status(400).send("An error occurred.");
        return;
    }
}

module.exports = router;
module.exports.verify = verify;
