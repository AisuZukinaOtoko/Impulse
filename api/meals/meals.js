var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate')


router.get('/meal', (req, res) =>{
    dbRequest("SELECT * FROM dbo.meals")
  .then((data) => {
    res.json(data);
})
});


router.post('/meal', (req, res) =>{
    const {date, type, description, email} = req.body;

    if (!date || !type || !description || !email){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "INSERT INTO dbo.meals VALUES (NEWID(), '" + date + "', '" + type + "', '" + description + "', '" + email + "')";

    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});


router.delete('/meal/delete/:id', (req, res) =>{
    const {id} = req.params;
    if (!id){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "DELETE FROM dbo.meals WHERE id = CONVERT(uniqueidentifier, '" + id + "')"; 
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});

module.exports = router;