const BASE_API_URL = "/api/v2";
const BASE_API_URL_v1 = "/api/v1";

import express from "express";
import cors from "cors";
import {loadBackend_RDQ_v2} from "./backend/api-RDQ-v2.js";
import {loadBackend_JRM_v2} from "./backend/api-JRM-v2.js";
import {loadBackend_RPP_v2} from "./backend/api-RPP-v2.js";
//var backend = require("./backend/api-JRM");
//var backend2 = require("./backend/api-RDQ");
//var backend3 = require("./backend/api-RPP");
import { handler } from "./frontend/build/handler.js";



var app = express();
app.use(cors());
var port = process.env.PORT || 12345;

//app.use("/",express.static("./public"));
app.use(express.json());


app.get(BASE_API_URL + "/economy-stats/docs", (req, res) => {
    console.log("Se ejecuta" + BASE_API_URL + "/economy-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/25969218/2s93JzMgXV");

});


//redireccion Rafa.
app.get(BASE_API_URL + "/employment-stats/docs", (req, res) => {
    console.log("Se ejecuta" + BASE_API_URL + "/employment-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/25969335/2s93JzM1Bb");

});

// R
app.get(BASE_API_URL + "/environment-stats/docs", (req, res) => {
    console.log("Se ejecuta");
    res.redirect("https://documenter.getpostman.com/view/26063123/2s93RNxZdi");

});

app.get("/api/v3/environment-stats/docs", (req, res) => {
    console.log("Se ejecuta");
    res.redirect("https://documenter.getpostman.com/view/26063123/2s93XyT3U1");

});


loadBackend_JRM_v1(app);
loadBackend_RDQ_v2(app);
loadBackend_JRM_v2(app);
loadBackend_RPP_v2(app);

loadBackend_RPP_v3(app);



app.use(handler);

app.listen(port, () => {
    console.log(`Server ready in port ${port}`);
});


