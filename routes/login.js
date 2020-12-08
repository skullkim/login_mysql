const express = require('express');
const path = require('path');
const User = require('../models/users');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const user = await User.findOne({
           where: {nick: req.body.nick}
        });
        if(user){
            if(!req.session.user){
                //const nick = req.body.nick;
                req.session.user = {
                    nick: req.body.nick,
                    passwd: req.body.passed,
                    authorized: true,
                }
                
            }
            let output = `
             <!DOCTYPE html>
             <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${req.body.nick}</title>
                </head>
                <body>
                    <h1>Hello ${req.body.nick}</h1>
                    <form action='/logout'>
                        <input type="submit" value="logout">
                    </form>
                </body>
             </html>
            `;
            res.send(output);
        }
        else{
            res.sendFile(path.join(__dirname, '../views/wrong_nick.html'));
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

module.exports = router;