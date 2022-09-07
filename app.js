const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = app.listen(8000);
const session = require('express-session');

/***
 * Use body parser middleware/node module
 */
app.use(bodyParser.urlencoded({extended: true}));

/***
 * For static files such as CSS, JS and Images
 */
app.use(express.static(__dirname + '/assets'));

/***
 * Setting up view engine - using EJS
 */
app.set('views', __dirname + '/application/views')
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5 * 60 * 1000,
    },
}));

/***
 * This is where you insert your routes
 */
app.use('/', require('./application/routes/Students'));