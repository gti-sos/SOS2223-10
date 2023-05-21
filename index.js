const BASE_API_URL = "/api/v2";
const BASE_API_URL_v1 = "/api/v1";

import express from "express";
import cors from "cors";
import request from "request";

import {loadBackend_RPP_v1} from "./backend/api-RPP.js";

import {loadBackend_JRM_v1} from "./backend/api-JRM.js";
import {loadBackend_RDQ_v2} from "./backend/api-RDQ-v2.js";
import {loadBackend_JRM_v2} from "./backend/api-JRM-v2.js";
import {loadBackend_RPP_v2} from "./backend/api-RPP-v2.js";
import { loadBackend_RDQ_v1 } from "./backend/api-RDQ.js";
import {loadBackend_RPP_v3} from "./backend/api-RPP-v3.js";
//var backend = require("./backend/api-JRM");
//var backend2 = require("./backend/api-RDQ");
//var backend3 = require("./backend/api-RPP");
import { handler } from "./frontend/build/handler.js";



var app = express();

var port = process.env.PORT || 12345;



//app.use("/",express.static("./public"));
app.use(express.json());

app.use(cors());         //Para el same Origin Policy



//Proxy RPP

var pathprox = "/proxyRPP"
var apiServerHost = "https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats"
app.use(pathprox, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
 });


loadBackend_RPP_v2(app);
loadBackend_RPP_v1(app);
loadBackend_RPP_v3(app);

// Proxi JRM
var pathprox = "/proxyJRM"
var apiServerHost = 'https://sos2223-22.appspot.com/api/v2/ict-promotion-strategy-stats';
app.use(pathprox, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.url);
  req.pipe(request(url)).pipe(res);
 });


loadBackend_JRM_v1(app);
loadBackend_JRM_v2(app);



app.get(BASE_API_URL + "/economy-stats/docs", (req, res) => {
    console.log("Se ejecuta" + BASE_API_URL + "/economy-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/25969218/2s93JzMgXV");

});

app.get(BASE_API_URL_v1 + "/economy-stats/docs", (req, res) => {
    console.log("Se ejecuta" + BASE_API_URL_v1 + "/economy-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/25969218/2s93XyThts");

});


//redireccion Rafa.
app.get(BASE_API_URL_v1 + "/employment-stats/docs", (req, res) => {
    console.log("Se ejecuta" + BASE_API_URL_v1 + "/employment-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/25969335/2s93JzM1Bb");
    
});
app.get(BASE_API_URL + "/employment-stats/docs", (req, res) => {
    console.log("Se ejecuta" + BASE_API_URL + "/employment-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/25969335/2s93XyTi8G");

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

app.get("/api/v1/environment-stats/docs", (req, res) => {
    console.log("Se ejecuta");
    res.redirect("https://documenter.getpostman.com/view/26063123/2s93JzN1dM");

});


loadBackend_RDQ_v1(app);
loadBackend_RDQ_v2(app);








app.use(handler);

app.listen(port, () => {
    console.log(`Server ready in port ${port}`);
});


