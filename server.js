var port = 666;
var debug = false;

var express = require("express");
const path = require("path");
var app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./source"));

server.listen(port, () => {
	console.log("[SERVER] listening on *:" + port);
});

io.on("connection", (socket) => {
	socket.on("exploit_start", function (data) {
		console.log("[EXPLOIT] Exploit has been started. (" + data.userAgent + ")");
	});

	if(debug === true) console.log("[CLIENT] New client connection... (" + socket.id + ")");
});
