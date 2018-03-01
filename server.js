// GLOBALS //
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/index')

// Create Express App
const app = express();

// Start on port 8080
var port = process.env.PORT || 8080;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Templating Engine
app.set('views', path.join(__dirname, 'views')) // this is the folder where we keep our pug files
app.set('view engine', 'pug') // Set view engine to Pug

// Handle our routes
app.use('/', routes)

// END GLOBALS
// AUTO PULL ON GIT PUSH
const { exec } = require('child_process');
app.post('/pull-from-git-please', (req, res) => {
    exec('git pull', (err, stdout, stderr) => {
        if(err) {
            res.status(500).send(stderr);
            return;
        }
        res.status(204).send(stdout);
    });
});

// START APP
app.listen(8080);
console.log('App is running on 8080');
