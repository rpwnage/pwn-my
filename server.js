var port = 666;

var express = require("express");
const path = require("path");
var app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("source"));

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "source/index.html"));
});

server.listen(port, () => {
	console.log("[SERVER] listening on *:" + port);
});

io.on("connection", (socket) => {
	console.log("[CLIENT] New client connection... (" + socket.id + ")");
});
