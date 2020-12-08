const express = require('express');
const path =  require('path');

const router = express.Router();

router.use(express.urlencoded({extended: true}));

router.get('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/index.html'));
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

// router.get('/signup', (req, res, next) => {
//     try{
//         res.sendFile(path.join(__dirname, "../views/signup.html"));
//     }
//     catch(err){
//         console.log(err);
//         next(err);
//     }
// })

module.exports = router;
