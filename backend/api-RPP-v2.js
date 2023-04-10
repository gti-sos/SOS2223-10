
//var Datastore = require('nedb');
import Datastore from "nedb";
var db = new Datastore();
const BASE_API_URL = "/api/v2";

//module.exports = (app) => {
function loadBackend_RPP_v2(app) {


    var environment_stats = [
        { year: 2016, city: "Almería", protected_space: 18, area: 163937, fire: 57 },
        { year: 2016, city: "Cádiz", protected_space: 29, area: 23122, fire: 108 },
        { year: 2016, city: "Córdoba", protected_space: 19, area: 134597, fire: 90 },
        { year: 2016, city: "Granada", protected_space: 17, area: 220314, fire: 119 },
        { year: 2016, city: "Huelva", protected_space: 24, area: 31911, fire: 155 },
        { year: 2016, city: "Jaén", protected_space: 17, area: 317381, fire: 172 },
        { year: 2016, city: "Málaga", protected_space: 28, area: 89272, fire: 111 },
        { year: 2016, city: "Sevilla", protected_space: 24, area: 220868, fire: 124 },
        { year: 2017, city: "Almería", protected_space: 18, area: 163937, fire: 87 },
        { year: 2017, city: "Cádiz", protected_space: 29, area: 23122, fire: 94 },
        { year: 2017, city: "Córdoba", protected_space: 19, area: 134597, fire: 78 },
        { year: 2017, city: "Almería", protected_space: 29, area: 123937, fire: 95 },
        
        
        { year: 2018, city: "Almería", protected_space: 18, area: 163937, fire: 87 },
        { year: 2018, city: "Cádiz", protected_space: 29, area: 23122, fire: 94 },
        { year: 2018, city: "Córdoba", protected_space: 19, area: 134597, fire: 78 },
        { year: 2018, city: "Granada", protected_space: 17, area: 220314, fire: 89 },
        { year: 2018, city: "Huelva", protected_space: 24, area: 31911, fire: 104 },
        { year: 2018, city: "Jaén", protected_space: 17, area: 317381, fire: 77 },
        { year: 2018, city: "Málaga", protected_space: 28, area: 89272, fire: 64 },
        { year: 2018, city: "Sevilla", protected_space: 24, area: 220868, fire: 64 },


    ];
    //tildes
    function stripAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    //  db.insert(environment_stats);

    //  *********************************************************    /GET    *********************************************************


    app.get(BASE_API_URL + "/environment-stats/loadInitialData", (req, res) => {

        db.find({}, function (err, docs) {

            if (err) {
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }
            else {
                db.remove({}, { multi: true }, (err, num) => {
                    if (err) {
                        res.sendStatus(500, "ERROR IN CLIENT");
                        return;
                    }
                    return;
                });
                var iniData = [
                    { year: 2016, city: "Almería", protected_space: 18, area: 163937, fire: 57 },
                    { year: 2016, city: "Cádiz", protected_space: 29, area: 23122, fire: 108 },
                    { year: 2016, city: "Córdoba", protected_space: 19, area: 134597, fire: 90 },
                    { year: 2016, city: "Granada", protected_space: 17, area: 220314, fire: 119 },
                    { year: 2016, city: "Huelva", protected_space: 24, area: 31911, fire: 155 },
                    { year: 2016, city: "Jaén", protected_space: 17, area: 317381, fire: 172 },
                    { year: 2016, city: "Málaga", protected_space: 28, area: 89272, fire: 111 },
                    { year: 2016, city: "Sevilla", protected_space: 24, area: 220868, fire: 124 },
                    { year: 2017, city: "Almería", protected_space: 18, area: 163937, fire: 87 },
                    { year: 2017, city: "Cádiz", protected_space: 29, area: 23122, fire: 94 },
                    { year: 2017, city: "Córdoba", protected_space: 19, area: 134597, fire: 78 },
                    { year: 2017, city: "Almería", protected_space: 29, area: 123937, fire: 95 },
                    
                    
                    { year: 2018, city: "Almería", protected_space: 18, area: 163937, fire: 87 },
                    { year: 2018, city: "Cádiz", protected_space: 29, area: 23122, fire: 94 },
                    { year: 2018, city: "Córdoba", protected_space: 19, area: 134597, fire: 78 },
                    { year: 2018, city: "Granada", protected_space: 17, area: 220314, fire: 89 },
                    { year: 2018, city: "Huelva", protected_space: 24, area: 31911, fire: 104 },
                    { year: 2018, city: "Jaén", protected_space: 17, area: 317381, fire: 77 },
                    { year: 2018, city: "Málaga", protected_space: 28, area: 89272, fire: 64 },
                    { year: 2018, city: "Sevilla", protected_space: 24, area: 220868, fire: 64 },
            
            
                ];
                iniData.forEach((e) => {
                    db.insert(e);
                });
                res.sendStatus(200, "OK");
            }
        });
    });



    app.get(BASE_API_URL + "/environment-stats", (request, response) => {
        console.log("New GET to /environment-stats");
        const { city, year, protected_space, area, fire, from, to } = request.query;
        const expectedFields = ["city", "year", "protected_space", "area", "fire", "from", "to", "limit", "offset"];
        var iuvYear = request.params.year;


        const receivedFields = Object.keys(request.query);
        const unexpectedFields = receivedFields.filter(field => !expectedFields.includes(field));

        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const offset = (page - 1) * limit;

        const sortField = request.query.sortField || "year";
        const sortOrder = request.query.sortOrder === "desc" ? -1 : 1;
        let docsCopy = []

        if (unexpectedFields.length > 0 || (from && to && from > to)) {
            console.log("No se han recibido los campos esperados:");
            return response.status(400).send("Bad Request");
        }

        db.find({}, (err, environmentStats) => {
            if (err) {
                console.log(`Error geting /environment-stats: ${err}`);
                return response.sendStatus(500);
            }

            let filteredData = environmentStats;

            if (city) {
                filteredData = filteredData.filter(({ city: t }) => t === city);
            }
            if (year) {
                console.log("New /GET to /environment-stats?year=", { area })
                filteredData = filteredData.filter(({ year: p }) => p === parseInt(year));
            }
            if (protected_space) {
                filteredData = filteredData.filter(({ protected_space: fh }) => fh === parseInt(protected_space));
            }
            if (area) {
                //*************************************************** */

                filteredData = filteredData.filter(({ area: hpt }) => hpt === parseInt(area));
            }
            if (fire) {
                filteredData = filteredData.filter(({ fire: t }) => t === parseInt(fire));
            }
            if (from && to) {
                filteredData = filteredData.filter(({ year: p }) => p >= from && p <= to);
            }

            if (request.query.fields) {
                const allowedFields = ["city", "year", "protected_space", "area", "fire"];
                const requestedFields = request.query.fields.split(",");
                const invalidFields = requestedFields.filter(field => !allowedFields.includes(field));
                if (invalidFields.length > 0) {
                    console.log(`No se han recibido los campos esperados: ${invalidFields.join(", ")}`);
                    return response.status(400).send("Bad Request");
                }
                filteredData = filteredData.map(record => {
                    const filteredRecord = {};
                    requestedFields.forEach(field => {
                        filteredRecord[field] = record[field];
                    });
                    return filteredRecord;
                });
            }


            filteredData.sort((a, b) => (a[sortField] < b[sortField] ? -1 : 1) * sortOrder);
            filteredData = filteredData.slice(offset, offset + limit);

            if (request.query.limit || request.query.offset) {
                const limit = parseInt(request.query.limit) || environmentStats.length;
                const offset = parseInt(request.query.offset) || 0;
                filteredData = filteredData.slice(offset, offset + limit);
            }


            const docsCopy = environmentStats;
            docsCopy.forEach((e) => {
                delete e._id;
            })


            response.json(filteredData);
        });
    });





    app.get(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        var city = req.params.city;
        const from = req.query.from;
        const to = req.query.to;
        //búsqueda

        let query = { city };
        if (from && to) {
            query.year = { $gte: parseInt(from), $lte: parseInt(to) };
        }


        let docsCopy = []
        db.find(query, (err, docs) => {
            if (err) {
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }
            else {
                if (docs == 0) {
                    res.sendStatus(404, "NOT FOUND")
                }
                else {
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy, null, 2));
                }
            }
        });
    });




    app.get(BASE_API_URL + "/environment-stats/:city/:year", (req, res) => {
        var iuvcity = req.params.city;
        var iuvYear = req.params.year;
        let docsCopy = []
        db.find({ city: iuvcity, year: parseInt(iuvYear) }, function (err, docs) {
            if (err) {
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }
            else {
                if (docs == 0) {
                    res.sendStatus(404, "NOT FOUND")
                }
                else {
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy[0], null, 2));
                }
            }
        });
    });

    //  ****************************************************************************************************************************






    //  *********************************************************    /POST    *********************************************************



    // FUNCION COMPROBAR QUERYS
    function compruebaQuery(e) {
        if (e.length == 0) {
            return true;
        }
        else {
            for (var i = 0; i < e.length; i++) {
                var query = e[i];
                if (query != "year" && query != "from" && query != "to" && query != "limit" && query != "offset") {
                    return false;
                }
            }
        }
    }
    app.post(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);

    });


    app.post(BASE_API_URL + "/environment-stats", (req, res) => {
        const newStat = req.body;
        if (!newStat.year || !newStat.city || !newStat.protected_space || !newStat.area || !newStat.fire) {
            console.log("Bad Request: missing required fields");
            res.sendStatus(400);
            return;
        }

        db.findOne({
            year: newStat.year,
            city: newStat.city,
            protected_space: newStat.protected_space,
            area: newStat.area,
            fire: newStat.fire
        }, (err, stat) => {
            if (err) {
                console.log(`Error finding environment stat: ${err}`);
                res.sendStatus(500);
                return;
            }

            if (stat !== null) {
                // If stat exists Conflict 409
                console.log(`Conflict: environment stat with same properties already exists`);
                res.sendStatus(409);
                return;
            }

            // If stat doesn´t exist Status 201
            db.insert(newStat, (err, newDoc) => {
                if (err) {
                    console.log(`Error inserting newStat into database: ${err}`);
                    res.sendStatus(500);
                } else {
                    console.log(`newStat with id ${newDoc._id} inserted into database`);
                    const responseObj = { ...newDoc };
                    delete responseObj._id;
                    res.status(201).json(responseObj);
                }
            });

            console.log(`new_stat = <${JSON.stringify(newStat, null, 2)}>`);
            console.log("New POST to /environment-stats");
        });
    });
    //  ****************************************************************************************************************************


    //  *********************************************************    /PUT    *********************************************************



    app.put(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        const city = req.params.city;
        const updatedStat = req.body;
        console.log(`new_stat = <${JSON.stringify(updatedStat, null, 2)}>`);
        
        if (updatedStat.city && updatedStat.city!== city) {
          return res.status(400).send('Ciudad en body no es el mismo que URL');
        }
        
        db.update({ city: city }, updatedStat, {}, function (err, numReplaced) {
          if (err) {
            console.log(`Error updating environment stat with city ${city}: ${err}`);
            res.sendStatus(500);
          } else if (numReplaced === 0) {
            console.log(`Environment stat with city ${city} not found`);
            res.sendStatus(404);
          } else {
            console.log(`Environment stat with city ${city} updated`);
            res.sendStatus(200);
          }
        });
      
        console.log("New PUT to /environment-stats/:city");
      });

      app.put(BASE_API_URL + "/environment-stats/:city/:year", (req, res) => {
        const city = req.params.city;
        const year = req.params.year;
        const updatedStat = req.body;
        console.log(`new_stat = <${JSON.stringify(updatedStat, null, 2)}>`);
        
        if (updatedStat.city && updatedStat.city !== city) {
          return res.status(400).send('Ciudad en body no es el mismo que URL');
        }
        
        db.update({ city: city, year: parseInt(year) }, updatedStat, {}, function (err, numReplaced) {
          if (err) {
            console.log(`Error updating environment stat with city ${city} and year ${year}: ${err}`);
            res.sendStatus(500);
          } else if (numReplaced === 0) {
            console.log(`Environment stat with city ${city} and year ${year} not found`);
            res.sendStatus(404);
          } else {
            console.log(`Environment stat with city ${city} and year ${year} updated`);
            res.sendStatus(200);
          }
        });
      
        console.log("New PUT to /environment-stats/:city/:year");
        
    });
    

      app.put(BASE_API_URL + "/environment-stats", (req, res) => {
        res.status(405).send('Method not Allowed');
        console.log(`Error 405 Method not Allowed`);

    });
      



//  ****************************************************************************************************************************


    //  *********************************************************    /DELETE    *********************************************************









    app.delete(BASE_API_URL + "/environment-stats/:city", (req, res) => {
        const city = req.params.city;
    
        db.remove({ city }, { multi: true }, function (err, numRemoved) {
            if (err) {
                console.log(`Error deleting environment stat with city ${city}: ${err}`);
                res.sendStatus(500);
            } else if (numRemoved === 0) {
                console.log(`Environment stat with city ${city} not found`);
                res.sendStatus(404);
            } else {
                console.log(`Environment stat with city ${city} deleted`);
                res.sendStatus(200);
                
            }
        });
    });


    app.delete(BASE_API_URL +"/environment-stats/:city/:year",(request, response)=>{
        var city = request.params.city;
        var year = parseInt(request.params.year);
        console.log(`New DELETE to /environment-stats/${city}/${year}`);
    
        db.remove({city:city,year:parseInt(year)},{},function (err, dbRemoved){
            if(err){
                console.log(`Error deleting`);
                response.sendStatus(500);
            }else{
                if(dbRemoved==0){
                    response.status(404).send("Not Found");
                }
                else{
                    console.log(`Files removed ${dbRemoved}`);
                    response.sendStatus(200);
                }
            }
        });
    });

   
    
    
   


    app.delete(BASE_API_URL + "/environment-stats", (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
            } else {
                console.log(`All ${numRemoved} environment stats from database`);
                res.sendStatus(204);
                environment_stats = [];
            }
        });
    });


    

}
export{loadBackend_RPP_v2};

