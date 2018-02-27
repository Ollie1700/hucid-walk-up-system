// GLOBALS //
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 8080;

var route = function(uri, page) {
    app.get(uri, (req, res) => {
        res.sendFile(path.join(__dirname + '/pages/' + page + '.html'));
    });
};

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

// SERVE STATIC FILES //

app.use(express.static(__dirname + '/public'));

// END SERVE STATIC FILES //
// ROUTES //

route('/', 'index');

route('/dashboard', 'dashboard');

route('/upcoming-talks', 'upcoming-talks');

route('/accommodation', 'accommodation');
    route('/accommodation/example', 'accommodation-single');

route('/schedule', 'schedule');
    route('/schedule/example', 'schedule-single');

route('/restaurants', 'restaurants');

route('/theatres', 'theatres');

route('/map', 'map');

route('/email', 'email');
    route('/email/sent', 'email-sent');

route('/lecture-halls', 'lecture-halls');

route('/speaker', 'speaker');

// END ROUTES //
// START APP
app.listen(8080);
console.log('API is running on 8080');
