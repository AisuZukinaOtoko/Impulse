var express = require('express');
var router = express.Router();

router.get('/', (req, res) =>{
    console.log(req.oidc.isAuthenticated());
    res.render('index', {title: "Impulse", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
});

});


module.exports = router;