const { json } = require('body-parser');
const { request, response } = require('express');
var Datastore = require('nedb');
var db = new Datastore();

/////Modulo Rushabh


/////////////////////////////////////////////////////////////////////////

app.use("/",express.static("./public"));
app.use(bodyParser.json());

/////Modulo Joaquin

//const { economy_stats } = require('./Module-JRM/api-JRM');






/////////////////////////////////////////////////////////////////////////


/*
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

app.get("/faces", (request, response) => {
    response.send(cool());
    console.log(new Request);
})

app.listen(port, () => {
    console.log(`Server ready in port ${port}`);
});





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

app.get(BASE_API_URL + "/economy-stats/loadInitialData", (request, response) => {

    if(economy_stats.length===0) {
        economy_stats.push({ period: 1999, territory: "Jaén", finished_house: 3704, half_price_m_two: 440, tourist: 857295 },
        { period: 1998, territory: "Sevilla", finished_house: 7176, half_price_m_two: 534, tourist: 1247438 },
        { period: 2000, territory: "Cádiz", finished_house: 13501, half_price_m_two: 644, tourist: 2682429 },
        { period: 2000, territory: "Granada", finished_house: 3672, half_price_m_two: 644, tourist: 2228642 },
        { period: 2008, territory: "Almería", finished_house: 16746, half_price_m_two: 1674, tourist: 2225479 },
        { period: 2011, territory: "Sevilla", finished_house: 6667, half_price_m_two: 1576, tourist: 2732934 },
        { period: 2012, territory: "Malaga", finished_house: 3797, half_price_m_two: 1618, tourist: 7073502 },
        { period: 2012, territory: "Sevilla", finished_house: 6313, half_price_m_two: 1414, tourist: 2673617 },
        { period: 2013, territory: "Sevilla", finished_house: 2790, half_price_m_two: 1296, tourist: 2616499 },
        { period: 2013, territory: "Cordoba", finished_house: 1384, half_price_m_two: 1202, tourist: 1333216 } )
    }
    response.json(economy_stats);
    console.log("New GET to /economy-stats")

});
app.get(BASE_API_URL + "/economy-stats", (request, response) => {
    response.json(economy_stats);
    console.log("New GET to /economy-stats")
});

app.post(BASE_API_URL + "/economy-stats", (req, res) => {


    var newStat = req.body;
    console.log(`new_stat = <${JSON.stringify(newStat, null, 2)}>`);

    if (!newStat.period || !newStat.territory || !newStat.finished_house || !newStat.half_price_m_two|| !newStat.tourist) {
        console.log("Bad Request: missing required fields");
        res.sendStatus(400);
        return;
    }

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
    
    } else {
        // If stat doesn´t exist Status 201
        economy_stats.push(newStat);
        console.log("Economy stat added to array");
        res.sendStatus(201);
    }


    console.log("New POST to /economy-stats");


});
app.delete(BASE_API_URL + "/economy-stats", (req, res) => {
    economy_stats = []; // eliminar todos los elementos de la matriz
    console.log("All economy stats deleted");
    res.sendStatus(204); // enviar respuesta con código de estado 204
});

//tildes
function stripAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

app.get(BASE_API_URL + "/economy-stats/:territory", (request, response) => {
    const territory = stripAccents(request.params.territory.toLowerCase());
    const territoryStats = economy_stats.filter((stat) => stripAccents(stat.territory.toLowerCase()) === territory);
    //response.json(territoryStats);
    console.log(`New GET to /economy-stats/${territory}`);

    if (territoryStats.length === 0) {
        console.log(`economy stats for territory ${territory} not found`);
        response.sendStatus(404);
    } else {
        response.json(territoryStats);
        console.log(`New GET to /economy-stats/${territory}`);
    }
});

app.put(BASE_API_URL + "/economy-stats/:territory", (req, res) => {
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
    console.log("New PUT to /economy-stats/:territory");
});

app.delete(BASE_API_URL + "/economy-stats/:territory", (req, res) => {
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
    console.log(`New DELETE to /economy-stats/${territory}`);
});
app.put(BASE_API_URL + "/economy-stats", (req, res) => {
    res.status(405).send('Method not Allowed');
    console.log(`Error 405 Method not Allowed`);
});
app.post(BASE_API_URL + "/economy-stats/:territory", (req, res) => {
    res.status(405).send('Method not Allowed');
    console.log(`Error 405 Method not Allowed`);

});


///////////////////////////////////////////////////////////////////////////////////////////////////////
// RAFA
var vacio =[ ]
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
db.insert(employment_stats); 
//Get de contenedor vacío
app.get(BASE_API_URL + "/employment-stats", (request, response) => {
    response.json(vacio);
    console.log("New GET to /employment-stats")
});
app.get(BASE_API_URL + "/employment-stats/loadInitialData", (request, response) => {
    response.json(employment_stats);
    console.log("Get to employment-stats/loadInitialData")
});
app.get(BASE_API_URL + "/employment-stats/:province", (request, response) => {
    const province = stripAccents(request.params.province.toLowerCase());
    const employmentStats = employment_stats.filter((stat) => stripAccents(stat.province.toLowerCase()) === province);
    response.json(employmentStats);
    console.log(`New GET to /economy_stats/${province}`);
});
app.post(BASE_API_URL + "/employment-stats", (req, res) => {
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
    if (!newStat.period || !newStat.province || !newStat.population_over_16_years || !newStat.activity_men_percentage || !newStat.activity_women_percentage) {
        console.log("Bad Request: missing required fields");
        res.sendStatus(400);
        return;
    }

    if (statIndex !== -1) {
        // If stat exists Conflict 409
        console.log(`Conflict: employment stat with same properties already exists`);
        res.sendStatus(409);
    
    }else {
        // If stat doesn´t exist Status 201
        environment_stats.push(newStat);
        console.log("Employment stat added to array");
        res.sendStatus(201);
    }
    console.log("New POST to /employment-stats");
});
    //actualizar un dato dando la provincia
    app.put(BASE_API_URL + "/employment-stats/:province", (req, res) => {
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
                period: updatedStat.period || employment-stats[statIndex].period,
                province: updatedStat.province || employment-stats[statIndex].province,
                population_over_16_years: updatedStat.population_over_16_years || employment-stats[statIndex].population_over_16_years,
                activity_men_percentage: updatedStat.activity_men_percentage || employment-stats[statIndex].activity_men_percentage,
                activity_women_percentage: updatedStat.activity_women_percentage || employment-stats[statIndex].activity_women_percentage
            };
            console.log(`employment stat with city ${province} updated`);
            res.sendStatus(200);
        }
        console.log("New PUT to /employment-stats/:province");
    });
    //Borrar un dato dando la provincia
    app.delete(BASE_API_URL + "/employment-stats/:province", (req, res) => {
        const province = stripAccents(req.params.province.toLowerCase());
        const originalLength = employment_stats.length;
        employment_stats = employment_stats.filter((stat) => {
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
    app.put(BASE_API_URL + "/employment-stats", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);

    });

    app.post(BASE_API_URL + "/environment-stats/:province", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);
    
    });
    app.use("/",express.static("./public")); 