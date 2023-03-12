/////Modulo Rushabh


const { express } = require('./Module-RPP/api-RPP');
const { cool } = require('./Module-RPP/api-RPP');
const { bodyParser } = require('./Module-RPP/api-RPP');
const { app } = require('./Module-RPP/api-RPP');
const { port } = require('./Module-RPP/api-RPP');
const { environment_stats } = require('./Module-RPP/api-RPP');
const { BASE_API_URL } = require('./Module-RPP/api-RPP');
/////////////////////////////////////////////////////////////////////////


//var express = require("express");
//var bodyParser = require("body-parser");

//var cool = require("cool-ascii-faces");
//const { request, response } = require("express");
//const BASE_API_URL = "/api/v1";
//var app = express();
//var port = process.env.PORT || 12345;
//app.use(bodyParser.json());


app.get("/cool", (request, response) => {
    response.send(cool());
    console.log("New request");
});


app.listen(port, () => {
    console.log(`Server ready in port ${port}`);
});

app.get("/samples/RDQ", (request, response) => {
    var datos_rafa = [
        { period: 1998, province: "sevilla", population_over_16_years: 1349525, activity_men_percentage: 65.5, activity_women_percentage: 36.3 },
        { period: 1999, province: "granada", population_over_16_years: 652275, activity_men_percentage: 60.2, activity_women_percentage: 35.3 },
        { period: 2004, province: "jaen", population_over_16_years: 527475, activity_men_percentage: 64.3, activity_women_percentage: 37.9 },
        { period: 2006, province: "huelva", population_over_16_years: 403650, activity_men_percentage: 65.8, activity_women_percentage: 40.0 },
        { period: 2007, province: "malaga", population_over_16_years: 1242900, activity_men_percentage: 68.1, activity_women_percentage: 47.0 },
        { period: 2009, province: "cadiz", population_over_16_years: 995375, activity_men_percentage: 67.9, activity_women_percentage: 45.6 },
        { period: 2011, province: "almeria", population_over_16_years: 557825, activity_men_percentage: 71.5, activity_women_percentage: 57.2 },
        { period: 2012, province: "jaen", population_over_16_years: 550700, activity_men_percentage: 63.2, activity_women_percentage: 46.0 },
        { period: 2014, province: "sevilla", population_over_16_years: 1571050, activity_men_percentage: 65.6, activity_women_percentage: 53.8 },
        { period: 2014, province: "almeria", population_over_16_years: 587775, activity_men_percentage: 69.2, activity_women_percentage: 53.6 }

    ];
    var filtrado = datos_rafa.filter(v => v.province == "jaen");
    var suma = 0;
    for (let i = 0; i < filtrado.length; i++) {
        var suma = suma + filtrado[i].population_over_16_years;
    }
    var media = suma / filtrado.length;
    //console.log("La poblacion mayor de 16 años en jaen de media es "+media)
    response.send(`La media de la poblacion mayor de 16 años en jaen es: ${media}`)
    console.log("New request");
});

app.get("/samples/RPP", (request, response) => {
    var raw_data = [
        { year: 2016, city: "Almería", protected_space: 18, area: 163.937, fire: 57 },
        { year: 2016, city: "Cádiz", protected_space: 29, area: 231.22, fire: 108 },
        { year: 2016, city: "Córdoba", protected_space: 19, area: 134.597, fire: 90 },
        { year: 2016, city: "Granada", protected_space: 17, area: 220.314, fire: 119 },
        { year: 2016, city: "Huelva", protected_space: 24, area: 319.11, fire: 155 },
        { year: 2016, city: "Jaén", protected_space: 17, area: 317.381, fire: 172 },
        { year: 2016, city: "Málaga", protected_space: 28, area: 89.272, fire: 111 },
        { year: 2016, city: "Sevilla", protected_space: 24, area: 220.868, fire: 124 },
        { year: 2017, city: "Almería", protected_space: 18, area: 163.937, fire: 87 },
        { year: 2017, city: "Cádiz", protected_space: 29, area: 231.22, fire: 94 },
        { year: 2017, city: "Córdoba", protected_space: 19, area: 134.597, fire: 78 },
        { year: 2017, city: "Almería", protected_space: 29, area: 123.937, fire: 95 },

    ];

    avg = 0;
    sum = 0;
    avg1 = 0;
    sum2 = 0;
    var data = raw_data.filter(cities => cities.city == "Almería");
    var data2 = raw_data.filter(cities => cities.city == "Córdoba");

    for (let i = 0; i < data.length; i++) {
        var sum = sum + data[i].fire;
        var avg = sum / data.length;
    }
    for (let i = 0; i < data2.length; i++) {
        var sum2 = sum2 + data2[i].fire;
        var avg1 = sum2 / data2.length;
    }

    console.log("Fire avg in Almería is ", avg);
    response.send(`Fire average in Almería is: ${avg}`)
});

app.get("/samples/JRM", (request, response) => {
    var datos_joaquin = [
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
    var datos = datos_joaquin.filter(ciudad => ciudad.territory == "Sevilla");
    media = 0;
    suma = 0;
    for (let i = 0; i < datos.length; i++) {
        var suma = suma + datos[i].tourist;
        var media = suma / datos.length;
    }



    console.log("La media de turistas en Sevilla es: ", media)
    response.send(`La media de turistas en sevilla es: ${media}`)
});

/////////////////////////////////////////////////////////////////////////////////////////////
//Rushabh








/////////////////////////////////////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Joaquin
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
    
    } else if(newStat.length !== 5){
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

///////////////////////////////////////////////////////////////////////////////////////////////////////
// RAFA
var employment_stats = [
    { period: 1998, province: "sevilla", population_over_16_years: 1349525, activity_men_percentage: 65.5, activity_women_percentage: 36.3 },
    { period: 1999, province: "granada", population_over_16_years: 652275, activity_men_percentage: 60.2, activity_women_percentage: 35.3 },
    { period: 2004, province: "jaen", population_over_16_years: 527475, activity_men_percentage: 64.3, activity_women_percentage: 37.9 },
    { period: 2006, province: "huelva", population_over_16_years: 403650, activity_men_percentage: 65.8, activity_women_percentage: 40.0 },
    { period: 2007, province: "malaga", population_over_16_years: 1242900, activity_men_percentage: 68.1, activity_women_percentage: 47.0 },
    { period: 2009, province: "cadiz", population_over_16_years: 995375, activity_men_percentage: 67.9, activity_women_percentage: 45.6 },
    { period: 2011, province: "almeria", population_over_16_years: 557825, activity_men_percentage: 71.5, activity_women_percentage: 57.2 },
    { period: 2012, province: "jaen", population_over_16_years: 550700, activity_men_percentage: 63.2, activity_women_percentage: 46.0 },
    { period: 2014, province: "sevilla", population_over_16_years: 1571050, activity_men_percentage: 65.6, activity_women_percentage: 53.8 },
    { period: 2014, province: "almeria", population_over_16_years: 587775, activity_men_percentage: 69.2, activity_women_percentage: 53.6 }
];
app.get(BASE_API_URL + "/employment_stats/loadInitialData", (request, response) => {
    response.json(employment_stats);
    console.log("Get to employment_stats/loadInitialData")
});
app.get(BASE_API_URL + "/employment_stats", (request, response) => {
    response.json(employment_stats);
    console.log("New GET to /employment_stats")
});
app.get(BASE_API_URL + "/employment_stats/:province", (request, response) => {
    const province = stripAccents(request.params.province.toLowerCase());
    const employmentStats = employment_stats.filter((stat) => stripAccents(stat.province.toLowerCase()) === province);
    response.json(employmentStats);
    console.log(`New GET to /economy_stats/${province}`);
});
app.post(BASE_API_URL + "/employment_stats",(req, res) => {
    var newStat = req.body; //guardamos los valores que envia el formulario.
    console.log(`new_stat = <${JSON.stringify(newStat, null, 2)}>`); // con stringify convertimos en string

    const statIndex = employment_stats.findIndex( //findIndex devuelve el indice del primer elemento 
        (propiedades) =>                                 //que cumpla las condiciones que se indican
            propiedades.period === newStat.period &&         //en caso contrario devolvera -1.  
            propiedades.province.toLowerCase() === newStat.province.toLowerCase() &&
            propiedades.population_over_16_years === newStat.population_over_16_years &&
            propiedades.activity_men_percentage === newStat.activity_men_percentage &&
            propiedades.activity_women_percentage === newStat.activity_women_percentage
    );

    if (statIndex !== -1) {
        // If stat exists Conflict 409
        console.log(`Conflict: employment stat with same properties already exists`);
        res.sendStatus(409);
    } else {
        // If stat doesn´t exist Status 201
        environment_stats.push(newStat);
        console.log("Employment stat added to array");
        res.sendStatus(201);
    }
    console.log("New POST to /employment_stats");

    app.put(BASE_API_URL + "/employment_stats/:province", (req, res) => {
        const province = stripAccents(req.params.province.toLowerCase());
        const updatedStat = req.body;
        console.log(`new_stat = <${JSON.stringify(updatedStat, null, 2)}>`);
        const statIndex = employment_stats.findIndex(
            (stat) =>
                stripAccents(stat.province.toLowerCase()) === stripAccents(province.toLowerCase())
        );
        if (updatedStat.province && stripAccents(updatedStat.province.toLowerCase()) !== stripAccents(province.toLowerCase())) {
            return res.status(400).send('Ciudad en body no es el mismo que URL');
        }
        if (statIndex === -1) {
            // Si el objeto no existe Not Found 404
            console.log(`employment stat with province ${province} not found`);
            res.sendStatus(404);
        } else {
            // Si el objeto existe, actualizar sus propiedades
            employment_stats[statIndex] = {
                period: updatedStat.period || employment_stats[statIndex].period,
                province: updatedStat.province || employment_stats[statIndex].province,
                population_over_16_years: updatedStat.population_over_16_years || employment_stats[statIndex].population_over_16_years,
                activity_men_percentage: updatedStat.activity_men_percentage || employment_stats[statIndex].activity_men_percentage,
                activity_women_percentage: updatedStat.activity_women_percentage || employment_stats[statIndex].activity_women_percentage
            };
            console.log(`employment stat with city ${province} updated`);
            res.sendStatus(200);
        }
        console.log("New PUT to /employment_stats/:province");
    });

    app.delete(BASE_API_URL + "/employment_stats/:province", (req, res) => {
        const city = stripAccents(req.params.province.toLowerCase());
        const originalLength = employment_stats.length;
        environment_stats = employment_stats.filter((stat) => {
            return stripAccents(stat.province.toLowerCase()) !== province;
        });
        const newLength = employment_stats.length;
        if (newLength === originalLength) {
            console.log(`province ${province} not found in employment stats array`);
            res.sendStatus(404);
        } else {
            console.log(`province ${province} deleted from employment stats array`);
            res.sendStatus(200);
        }
        console.log(`New DELETE to /employment-stats/${province}`);
    });
    /*
    app.put(BASE_API_URL + "/employment_stats", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);

    });
    */

    app.post(BASE_API_URL + "/environment-stats/:province", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);
    
    });





