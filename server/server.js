var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var SpaceControl = require(__dirname + '/spaceControl.js');
var spaceConfig = require(__dirname + '/spaceConfig.js');

app.use(express.json());

app.use('/', express.static(__dirname + '/../client/public/html'));
app.use('/css', express.static(__dirname + '/../client/public/css'));
app.use('/js', express.static(__dirname + '/../client/public/js'));
app.use('/img', express.static(__dirname + '/../client/public/img'));
app.use('/fonts', express.static(__dirname + '/../client/public/fonts'));

var spaceControl = new SpaceControl(
    /* server ip */   '192.168.3.42',
    /* server port */ '80',
    /* hauscode */    '10011');

io.sockets.on('connection', function (socket) {
    socket.emit("spaceConfig", spaceConfig);
    socket.on('message', function (data) {
        data = JSON.parse(data);
        var controller = spaceControl[data.controller];
        if(controller){
            var command = controller[data.command];
            if(command) {
                command(data.args);
            }
        }
    });
});

/*
app.post('/', function(req, res){
    res.send('hello world');
});
*/

var port = process.env.PORT || 3333;
console.log(port);
server.listen(port);
