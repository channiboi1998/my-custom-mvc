const express = require('express');
const app = express();
const server = app.listen(8000);
const session = require('express-session');
/***
 * For static files such as CSS, JS and Images
 */
app.use(express.static(__dirname + '/assets'));

/***
 * Setting up view engine - using EJS
 */
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    },
}));

/***
 * This is where you insert your routes
 */
app.use('/', require('./routes/Cars'));