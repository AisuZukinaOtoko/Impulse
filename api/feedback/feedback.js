var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate')


router.get('/feedback', (req, res) =>{
    dbRequest("SELECT * FROM dbo.feedbacks")
  .then((data) => {
    res.json(data);
})
});


router.get('/feedback/:email', (req, res) =>{
  const {email} = req.params;
  if (email === undefined){
    res.status(400).send("An error occured.");
    return;
  }

  let query = "SELECT * FROM dbo.feedbacks WHERE email = '" + email + "'";
  dbRequest(query)
.then((data) => {
  
  res.json(data);
})
});


router.post('/feedback', (req, res) =>{
    const {project_reference, description, email, date} = req.body;

    if (!date || !project_reference || !description || !email){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "INSERT INTO dbo.feedbacks VALUES (NEWID(), '" + project_reference + "', '" + description + "', '" + email + "', '" + date + "')";

    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});


router.delete('/feedback/delete/:id', (req, res) =>{
    const {id} = req.params;
    if (!id){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "DELETE FROM dbo.feedbacks WHERE id = CONVERT(uniqueidentifier, '" + id + "')"; 
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});

module.exports = router;