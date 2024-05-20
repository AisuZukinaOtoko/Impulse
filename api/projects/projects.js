var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate')


router.get('/project', (req, res) =>{
    dbRequest("SELECT * FROM dbo.projects")
  .then((data) => {
    res.json(data);
})
});


router.post('/project', (req, res) =>{
    const {name, description, members, manager, status} = req.body;

    if (!name || !description || !members || !manager || !status){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "INSERT INTO dbo.projects VALUES (NEWID(), '" + name + "', '" + description + "', '" + members + "', '" + manager + "', '" + status + "')";

    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});


router.delete('/project/delete/:id', (req, res) =>{
    const {id} = req.params;
    if (!id){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "DELETE FROM dbo.projects WHERE id = CONVERT(uniqueidentifier, '" + id + "')"; 
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});

module.exports = router;