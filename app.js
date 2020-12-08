const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookie_parser =  require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const {sequelize} = require('./models');
const main_page_router = require('./routes');
const login_router = require('./routes/login');
const signup_router = require('./routes/signup');
const signup_success_router = require('./routes/correct_signup');
const logout_router = require('./routes/logout');

const app = express();
const time = new Date();
app.set('port', process.env.PORT || 8080);

sequelize.sync({force: false})
    .then(() => {
        console.log('success to connect DB');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secrue: false,
        maxAge: time.getMilliseconds() + (1000 * 60),
    },
    name: 'session-cookie',
}));

app.use('/', main_page_router);
app.use('/login', login_router);
app.use('/signup', signup_router);
app.use('/correct_signup', signup_success_router);
app.use('/logout', logout_router);
// app.post('/newMember', (req, res) => {
//     res.sendFile(path.join(__dirname, './views/signup_success.html'));
// })

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} router doesn't exist`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')} start server`);
});