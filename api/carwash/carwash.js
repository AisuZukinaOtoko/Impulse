var express = require('express');
var router = express.Router();
const dbRequest = require('./../boilerplate')


router.get('/carwash', (req, res) =>{
    dbRequest("SELECT * FROM dbo.carwashBooking")
  .then((data) => {
    res.json(data);
})
});


router.post('/carwash', (req, res) =>{
    const {date, slot, email, carModel} = req.body;

    if (!date || !slot || !email || !carModel){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "INSERT INTO dbo.carwashBooking VALUES (NEWID(), '" + date + "', '" + slot + "', '" + email +  "', '" + carModel + "')";

    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});


router.delete('/carwash/delete/:id', (req, res) =>{
    const {id} = req.params;
    if (!id){
        res.status(400).send("An error occured.");
        return;
    }

    let query = "DELETE FROM dbo.carwashBooking WHERE id = CONVERT(uniqueidentifier, '" + id + "')"; 
    dbRequest(query)
  .then((response) => {
    res.status(200).json(response);
})
});

module.exports = router;