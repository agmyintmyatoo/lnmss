const net = require('net')
const repl = require('repl')

let connections = 0

repl.start({
    prompt: "stdin> ",
    input: process.stdin,
    output: process.stdout
})

net.createServer((socket) => {
    connections += 1
    repl.start({
        prompt: "Unix socket> ",
        input: socket,
        output: socket,
    }).on('exit', () => socket.end())
}).listen("/tmp/node-repl-sock")

net.createServer((socket) => {
    connections += 1
    repl.start({
        prompt: "TCP socket> ",
        input: socket,
        output: socket,
    }).on('exit', () => socket.end())
}).listen(5001)