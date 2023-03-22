var express = require("express");
var cool = require("cool-ascii-faces")
var bodyParser = require("body-parser");
var backend = require("./backend/api-JRM");
var backend2 = require("./backend/api-RDQ")
var backend3 = require("./backend/api-RPP")


var app = express();
var port = process.env.PORT || 12345;

app.use("/",express.static("./public"));
app.use(bodyParser.json());

backend(app);
backend2(app);
backend3(app);

//app.get("/faces", (request, response) => {
  //  response.send(cool());
    //console.log(new Request);
//})

app.listen(port, () => {
    console.log(`Server ready in port ${port}`);
});


