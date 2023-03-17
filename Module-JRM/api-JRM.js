/*var express = require("express");
var bodyParser = require("body-parser");

var cool = require("cool-ascii-faces");
const { request, response } = require("express");
const BASE_API_URL = "/api/v1";
var app = express();
var port = process.env.PORT || 12345;
app.use(bodyParser.json());


var economy_stats = [
    { period: 1999, territory: "Jaén", finished_house: 3704, half_price_m_two: 440, tourist: 857295 },
    { period: 1998, territory: "Sevilla", finished_house: 7176, half_price_m_two: 534, tourist: 1247438 },
    { period: 2000, territory: "Cádiz", finished_house: 13501, half_price_m_two: 644, tourist: 2682429 },
    { period: 2000, territory: "Granada", finished_house: 3672, half_price_m_two: 644, tourist: 2228642 },
    { period: 2008, territory: "Almería", finished_house: 16746, half_price_m_two: 1674, tourist: 2225479 },
    { period: 2011, territory: "Sevilla", finished_house: 6667, half_price_m_two: 1576, tourist: 2732934 },
    { period: 2012, territory: "Malaga", finished_house: 3797, half_price_m_two: 1618, tourist: 7073502 },
    { period: 2012, territory: "Sevilla", finished_house: 6313, half_price_m_two: 1414, tourist: 2673617 },
    { period: 2013, territory: "Sevilla", finished_house: 2790, half_price_m_two: 1296, tourist: 2616499 },
    { period: 2013, territory: "Cordoba", finished_house: 1384, half_price_m_two: 1202, tourist: 1333216 },
];

app.get(BASE_API_URL + "/economy_stats/loadInitialData", (request, response) => {
    response.json(economy_stats);
    console.log("New GET to /economy_stats")
});
app.get(BASE_API_URL + "/economy_stats", (request, response) => {
    response.json(economy_stats);
    console.log("New GET to /economy_stats")
});

app.post(BASE_API_URL + "/economy_stats", (req, res) => {


    var newStat = req.body;
    console.log(`new_stat = <${JSON.stringify(newStat, null, 2)}>`);

    const statIndex = economy_stats.findIndex(
        (stat) =>
            stat.period === newStat.period &&
            stat.territory.toLowerCase() === newStat.territory.toLowerCase() &&
            stat.finished_house === newStat.finished_house &&
            stat.half_price_m_two === newStat.half_price_m_two &&
            stat.tourist === newStat.tourist
    );

    if (statIndex !== -1) {
        // If stat exists Conflict 409
        console.log(`Conflict: economy stat with same properties already exists`);
        res.sendStatus(409);

    } else if (newStat.length !== 5) {
        console.log(`Conflict: El numero de campos es incorrecto`);
        res.sendStatus(400);

    } else {
        // If stat doesn´t exist Status 201
        economy_stats.push(newStat);
        console.log("Economy stat added to array");
        res.sendStatus(201);
    }


    console.log("New POST to /economy_stats");


});
app.delete(BASE_API_URL + "/economy_stats", (req, res) => {
    economy_stats = []; // eliminar todos los elementos de la matriz
    console.log("All economy stats deleted");
    res.sendStatus(204); // enviar respuesta con código de estado 204
});

//tildes
function stripAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

app.get(BASE_API_URL + "/economy_stats/:territory", (request, response) => {
    const territory = stripAccents(request.params.territory.toLowerCase());
    const territoryStats = economy_stats.filter((stat) => stripAccents(stat.territory.toLowerCase()) === territory);
    response.json(territoryStats);
    console.log(`New GET to /economy_stats/${territory}`);
});

app.put(BASE_API_URL + "/economy_stats/:territory", (req, res) => {
    const territory = stripAccents(req.params.territory.toLowerCase());
    const updatedStat = req.body;
    console.log(`new_stat = <${JSON.stringify(updatedStat, null, 2)}>`);
    const statIndex = economy_stats.findIndex(
        (stat) =>
            stripAccents(stat.territory.toLowerCase()) === stripAccents(territory.toLowerCase())
    );

    if (updatedStat.territory && stripAccents(updatedStat.territory.toLowerCase()) !== stripAccents(territory.toLowerCase())) {
        return res.status(400).send('Ciudad en body no es el mismo que URL');
    }

    if (statIndex === -1) {
        // Si el objeto no existe Not Found 404
        console.log(`Economy stat with city ${territory} not found`);
        res.sendStatus(404);

    } else {
        // Si el objeto existe, actualizar sus propiedades
        economy_stats[statIndex] = {
            period: updatedStat.period || economy_stats[statIndex].period,
            territory: updatedStat.territory || economy_stats[statIndex].territory,
            finished_house: updatedStat.finished_house || economy_stats[statIndex].finished_house,
            half_price_m_two: updatedStat.half_price_m_two || economy_stats[statIndex].half_price_m_two,
            tourist: updatedStat.tourist || economy_stats[statIndex].tourist
        };
        console.log(`economy stat with city ${territory} updated`);
        res.sendStatus(200);
    }
    console.log("New PUT to /economy_stats/:territory");
});

app.delete(BASE_API_URL + "/economy_stats/:territory", (req, res) => {
    const territory = stripAccents(req.params.territory.toLowerCase());
    const originalLength = economy_stats.length;
    economy_stats = economy_stats.filter((stat) => {
        return stripAccents(stat.territory.toLowerCase()) !== territory;
    });
    const newLength = economy_stats.length;
    if (newLength === originalLength) {
        console.log(`Territory ${territory} not found in economy stats array`);
        res.sendStatus(404);
    } else {
        console.log(`Territory ${territory} deleted from economy stats array`);
        res.sendStatus(200);
    }
    console.log(`New DELETE to /economy_stats/${territory}`);
});
app.put(BASE_API_URL + "/economy_stats", (req, res) => {
    res.status(405).send('Method not Allowed');
    console.log(`Error 405 Method not Allowed`);
});
app.post(BASE_API_URL + "/environment-stats/:city", (req, res) => {
    res.status(405).send('Method not Allowed');
    console.log(`Error 405 Method not Allowed`);

});

module.exports = {
    express,
    cool,
    bodyParser,
    app,
    port,
    economy_stats,
    BASE_API_URL,
    
};
*/
