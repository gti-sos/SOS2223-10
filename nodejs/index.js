var express = require("express");

var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/faces", (request,response) => {
    response.send(cool());
    console.log("New request");
});


app.listen(port, ()=>{
    console.log(`Server ready in port ${port}`);
});

