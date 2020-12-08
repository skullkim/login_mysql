const express = require('express');
const path = require('path');
const User = require('../models/users');

const router = express.Router();
router.use(express.urlencoded({extended: true}));

router.post('/', async (req, res, next) => {
    try{
        //res.sendFile(path.join(__dirname, '../views/signup_success.html'));
        //console.log(req.body.password1, req.body.password2);
        const user = await User.findOne({
            where: {nick: req.body.nick}
        });
        if(!user && req.body.password1 === req.body.password2){
            const user = await User.create({
                nick: req.body.nick,
                passwd: req.body.password1,
            });
            res.sendFile(path.join(__dirname, '../views/signup_success.html'));
        }
        else{
            if(req.body.password1 !== req.body.password2){
                res.sendFile(path.join(__dirname, '../views/signup_wrong_passwd.html'));
            }
            else if(user){
                res.sendFile(path.join(__dirname, '../views/same_nick.html'));
            }
        }
    }
    catch(err){
        console.log(1);
        console.log(err);
        next(err);
    }
});

module.exports = router;