function Socket() {
    var self = this;
    
    var socket = io.connect();
    
    self.call = function (controller, command, args) {
        socket.send(JSON.stringify({
            controller: controller,
            command: command,
            args: args
        }));
    };
}