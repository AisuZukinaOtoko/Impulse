var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate')


router.get('/timesheet', (req, res) =>{
    dbRequest("SELECT * FROM dbo.timesheet")
  .then((data) => {
    res.json(data);
})
});


router.get('/timesheet/:email', (req, res) =>{
  const {email} = req.params;
  let query = "SELECT * FROM dbo.timesheet WHERE email = '" + email + "'";
  dbRequest(query)
.then((data) => {
  res.json(data);
})
});


router.post('/timesheet', (req, res) =>{
    const {date, startTime, endTime, duration, manager, task, email} = req.body;
    

    console.log(req.body);

    if (!date || !startTime || !endTime){
        res.status(401).send("An error occured.");
        return;
    }
    if (!duration || !manager){
      res.status(402).send("An error occured.");
      return;
    }
    if (!task || !email){
      res.status(403).send("An error occured.");
      return;
    }


    let query = "INSERT INTO dbo.timesheet VALUES (NEWID(), '" + date + "', '" + startTime + "', '" + endTime + "', '" + duration + "', '" + manager + "','" + task + "','" + email + "')";

    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});


router.delete('/timesheet/delete/:id', (req, res) =>{
    const {id} = req.params;
    if (!id){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "DELETE FROM dbo.timesheet WHERE id = CONVERT(uniqueidentifier, '" + id + "')"; 
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});

module.exports = router;