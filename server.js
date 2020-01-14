// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");

var app = express();

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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
    var people = {};

    // io.on('connection', function (socket) {
    //     console.log('a user connected');
    //     socket.on('disconnect', function () {
    //         console.log('user disconnected');
    //     });
    // });

    // io.on('connection', function (socket) {
    //     socket.on('chat message', function (msg) {
    //         io.emit('chat message', msg);
    //     });
    // });

    io.on("connection", function (client) {
        client.on("join", function(name){
            console.log(name+ ' connected:' + client.id);
            people[client.id] = name;
            // client.emit("update", "You have connected to the server.");
            io.sockets.emit("update", " " + name + " has joined the server.");
            io.sockets.emit("update-people", people);
        });
    
        client.on("send", function(msg){
            io.emit("chat", people[client.id], msg);
        });
    
        client.on("disconnect", function(){
            io.sockets.emit("update", people[client.id] + " has left the server.");
            delete people[client.id];
            io.sockets.emit("update-people", people);
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

