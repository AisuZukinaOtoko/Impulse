const express = require('express');
const router = express.Router();
const dbRequest = require('../boilerplate');

// GET /users - Fetch all users
router.get('/users', async (req, res) => {
    try {
        const result = await dbRequest(); // Assuming dbRequest fetches users
        res.status(200).send(result.recordset);
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

// POST /users - Create a new user
router.post('/users', async (req, res) => {
    const { Name, LastName, email, permissions, phoneNo } = req.body;
    if (!Name || !LastName || !email || !permissions || !phoneNo) {
        return res.status(400).send('An error occurred.');
    }

    try {
        const result = await dbRequest(); // Assuming dbRequest inserts a user
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

// DELETE /users/delete/:email - Delete a user by email
router.delete('/users/delete/:email', async (req, res) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).send('Email parameter is missing.');
    }

    try {
        const result = await dbRequest(); // Assuming dbRequest deletes a user
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});

module.exports = router;
