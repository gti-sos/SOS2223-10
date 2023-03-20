var Datastore = require('nedb');
var db = new Datastore();
const BASE_API_URL = "/api/v1";
module.exports = (app) => {

    var environment_stats = [
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


    app.get(BASE_API_URL + "/environment-stats/loadInitialData", (request, response) => {
        if (environment_stats.length === 0) {
            environment_stats.push(
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
            );
            console.log("Inserted data into environment_stats");
            db.insert(environment_stats, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Inserted ${docs.length} documents into environment_stats`);
                }
            });
        }
        response.json(environment_stats);
        console.log("New GET to /environment-stats");
    });
    
    app.get(BASE_API_URL + "/environment-stats", (request, response) => {
        db.find({}, (err, environment_stats) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(environment_stats.map((c) => {
                    delete c._id;
                    console.log("New GET to /environment-stats");
                    return c;
                }));
            }
        });
    });

    app.post(BASE_API_URL + "/environment-stats", (req, res) => {
        const newStat = req.body;
        if (!newStat.year || !newStat.city || !newStat.protected_space || !newStat.area || !newStat.fire) {
            console.log("Bad Request: missing required fields");
            res.sendStatus(400);
            return;
        }
        
        const statIndex = environment_stats.findIndex(
            (stat) =>
                stat.year === newStat.year &&
                stat.city.toLowerCase() === newStat.city.toLowerCase() &&
                stat.protected_space === newStat.protected_space &&
                stat.area === newStat.area &&
                stat.fire === newStat.fire
        );
    
        if (statIndex !== -1) {
            // If stat exists Conflict 409
            console.log(`Conflict: environment stat with same properties already exists`);
            res.sendStatus(409);
            return;
        }
    
        // If stat doesn´t exist Status 201
        environment_stats.push(newStat);
        console.log("Environment stat added to array");
    
        // Insert newStat in the database
        db.insert(newStat, (err, newDoc) => {
            if (err) {
                console.log(`Error inserting newStat into database: ${err}`);
                res.sendStatus(500);
            } else {
                console.log(`newStat with id ${newDoc._id} inserted into database`);
                res.status(201).json(newDoc);
            }
        });
    
        console.log(`new_stat = <${JSON.stringify(newStat, null, 2)}>`);
        console.log("New POST to /environment-stats");
    });
    

    app.delete(BASE_API_URL + "/environment-stats", (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                console.log(`All ${numRemoved} environment stats from database`);
                res.sendStatus(204);
                environment_stats=[];
            }
        });
    });
    //tildes
    function stripAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    app.get(BASE_API_URL + "/environment-stats/:city", (request, response) => {

        const city = stripAccents(request.params.city.toLowerCase());
    
        db.find({ city: city }, (err, docs) => {
            if (err) {
                console.log(`Error finding environment stats for city ${city}`);
                response.sendStatus(500);
            } else {
                if (docs.length === 0) {
                    console.log(`Environment stats for city ${city} not found`);
                    response.sendStatus(404);
                } else {
                    response.json(docs);
                    console.log(`New GETT to /environment-stats/${city}`);
                }
            }
        });
    });
    
  

    app.get(BASE_API_URL + "/environment-stats/:city/:year", (request, response) => {

        const city = stripAccents(request.params.city.toLowerCase());
        const year = request.params.year;

        const cityStats = environment_stats.filter(stat => stripAccents(stat.city.toLowerCase()) === city && stat.year === parseInt(year));
        if (cityStats.length > 0) {
            response.json(cityStats);
        } else {
            response.sendStatus(404);
        }
        //   response.json(cityStats);
        console.log(`New GET to /environment-stats/${city}/${year}`);
    });


    app.put(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        const city = stripAccents(req.params.city.toLowerCase());
        const updatedStat = req.body;
        console.log(`new_stat = <${JSON.stringify(updatedStat, null, 2)}>`);
        const statIndex = environment_stats.findIndex(
            (stat) =>
                stripAccents(stat.city.toLowerCase()) === stripAccents(city.toLowerCase())
        );

        if (updatedStat.city && stripAccents(updatedStat.city.toLowerCase()) !== stripAccents(city.toLowerCase())) {
            return res.status(400).send('Ciudad en body no es el mismo que URL');
        }
        if (statIndex === -1) {
            // Si el objeto no existe Not Found 404
            console.log(`Environment stat with city ${city} not found`);
            res.sendStatus(404);
        } else {
            // Si el objeto existe, actualizar sus propiedades
            environment_stats[statIndex] = {
                year: updatedStat.year || environment_stats[statIndex].year,
                city: updatedStat.city || environment_stats[statIndex].city,
                protected_space: updatedStat.protected_space || environment_stats[statIndex].protected_space,
                area: updatedStat.area || environment_stats[statIndex].area,
                fire: updatedStat.fire || environment_stats[statIndex].fire
            };
            // Actualizar la base de datos con las nuevas estadísticas de ambiente
        db.set('environment_stats', environment_stats).write();

            console.log(`Environment stat with city ${city} updated`);
            res.sendStatus(200);
        }
        console.log("New PUT to /environment-stats/:city");
    });

    app.delete(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        const city = stripAccents(req.params.city.toLowerCase());
        const originalLength = environment_stats.length;
        environment_stats = environment_stats.filter((stat) => {
            return stripAccents(stat.city.toLowerCase()) !== city;
        });
        const newLength = environment_stats.length;
        if (newLength === originalLength) {
            console.log(`City ${city} not found in environment stats array`);
            res.sendStatus(404);
        } else {
            console.log(`City ${city} deleted from environment stats array`);
            res.sendStatus(200);
        }
        console.log(`New DELETE to /environment-stats/${city}`);
    });
    app.put(BASE_API_URL + "/environment-stats", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);

    });
    app.post(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);

    });
}


