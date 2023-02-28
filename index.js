var express = require("express");

var cool = require("cool-ascii-faces");

var app = express();

app.get("/", (req,res => {
    res.send(cool());
    console.log("new request");
}));

console.log(cool());