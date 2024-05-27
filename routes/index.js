const express = require('express');
const router = express.Router();
const path = require('path'); // Don't forget to include the path module

router.get('/', (req, res) =>{
    console.log(req.oidc.isAuthenticated());
    // console.log(req.oidc.user);
    res.render('index', {
        title: "IMPULSE", 
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.get('/ManagerHomepage.ejs', (req, res) =>{
    console.log(req.oidc.isAuthenticated());
     console.log(req.oidc.user);
    res.render('ManagerHomepage', {
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.get('/EmployeeHomepage.ejs', (req, res) =>{
    console.log(req.oidc.isAuthenticated());
     console.log(req.oidc.user);
    res.render('EmployeeHomepage', {
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

router.get('/HRHomepage.ejs', (req, res) =>{
    console.log(req.oidc.isAuthenticated());
    // console.log(req.oidc.user);
    res.render('HRHomepage', {
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});



// router.get('/EmployeeHomepage', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/homepage/EmployeeHomepage.html'));
// });

module.exports = router;
