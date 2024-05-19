var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate')


router.get('/timesheet', (req, res) =>{
    dbRequest("SELECT * FROM dbo.users")
  .then((data) => {
    res.json(data);
})
});


router.post('/timesheet', (req, res) =>{
    const {Name, LastName, email, permissions, phoneNo} = req.body;

    if (!Name || !LastName || !email || permissions == undefined || !phoneNo){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "INSERT INTO dbo.users VALUES ('" + Name + "', '" + LastName + "', '" + email + "', " + permissions + ", N'" + phoneNo + "')";
    console.log(query);
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});


router.delete('/timesheet/delete/:email', (req, res) =>{
    const {email} = req.params;
    if (!email){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "DELETE FROM dbo.users WHERE email = '" + email + "'"; 
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});

module.exports = router;