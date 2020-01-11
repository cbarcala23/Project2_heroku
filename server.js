// var app = require('express')();
var express = require('express');
var app = express();
// var http = require('http').createServer(app);
var socket = require('socket.io');

var PORT = process.env.PORT || 8000;
// Requiring our models for syncing
var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

require("./routes/API")(app);
require("./routes/HTML")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
    var server = app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });

    //SOCKET CONNECTION WITHIN APP SERVER
    var io = socket(server);

    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
    
    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            io.emit('chat message', msg);
        });
    });
});


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/kpop.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/rock.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/classical.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/edm.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/jazz.html');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/hiphop.html');
});





// http.listen(8080, function () {
//     console.log('sockets listening on *:8080');
// });

