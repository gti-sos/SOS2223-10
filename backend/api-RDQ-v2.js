//const { response } = require('express');
import Datastore from "nedb";
var db = new Datastore();
const BASE_API_URL = "/api/v2";
function loadBackend_RDQ_v2(app) {
    var vacio = []
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
    db.insert(employment_stats);    //Comentar si piden que la base al principio este vacia.
    console.log("Datos insertados");
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    //_______________________________________METODOS GET______________________________________________
    //////////////////////////////////////////////////////////////////////////////////////////////////


    //REDIRECCION
    app.get(BASE_API_URL + "/employment-stats/docs", (req, res) => {
        console.log("Se ejecuta");
        res.status(301).redirect("https://documenter.getpostman.com/view/25969335/2s93JzM1Bb");

    });
    //                      LOAD INITIAL DATA, NO MOVER DE SITIO.
    app.get(BASE_API_URL + "/employment-stats/loadInitialData", (req, res) => {
        console.log("New GET to /employment-stats/loadInitialData");
        db.find({}, function (err, data) {
            if (err) {
                console.log(`Error geting /employment-stats/loadInitialData: ${err}`);
                res.sendStatus(500);
            }
            else {
                if (data.length == 0) {
                    console.log(`data inserted: ${employment_stats.length}`);
                    db.insert(employment_stats);
                    res.json(employment_stats.map((d) => {
                        delete d._id;
                        return d;
                    }));
                }
                else {
                    console.log(`Data is already inserted: ${data.length}`);
                    res.status(200).send("Data is already inserted");
                }
            }
        });
    });


    //b
    app.get(BASE_API_URL + "/employment-stats", (req, res) => {
        var query = req.query;
        const dbquery = {};
        console.log("Peticion GET");
        console.log(query.period);
        var limit = Number.MAX_SAFE_INTEGER;
        var offset = 0;

        var from = req.query.from;
        var to = req.query.to;
        if (from > to) {
            console.log(`No se han recibido los campos esperados:`);
            res.status(400).send("Bad Request");
        }

        if (query.offset) {
            offset = parseInt(query.offset);
            console.log(offset);
            delete query.offset;
        }
        if (query.limit) {
            limit = parseInt(query.limit);
            delete query.limit;
        }
        if (query.period) {
            dbquery['period'] = parseInt(query.period);
            console.log(offset);
        }
        if (query.province) {
            dbquery['province'] = convertirAMinusculas(query.province);
            console.log(offset);
        }
        if (query.population_over_16_years) {
            dbquery['population_over_16_years'] = parseInt(query.population_over_16_years);
        }
        if (query.activity_men_percentage) {
            dbquery['activity_men_percentage'] = parseFloat(query.activity_men_percentage);
        }
        if (query.activity_women_percentage) {
            dbquery['activity_women_percentage'] = parseFloat(query.activity_women_percentage);
        }

        console.log(dbquery);

        db.find(dbquery).skip(offset).limit(limit).exec((err, docs) => {
            console.log(docs);
            if (err) {
                res.sendStatus(500);
            }
            else {
                if (from != null && to != null) {
                    docs = docs.filter((reg) => {
                        return (reg.period >= from && reg.period <= to);
                    });

                    if (docs == 0) {
                        console.log(`Data not found /employment-stats: ${err}`);
                        res.status(404).send("Data not found");
                    }
                }
                if (docs == 0) {
                    docs.forEach((docs) => {
                        delete docs._id;
                    });
                    res.status(200).send(JSON.stringify(docs, null, 2));
                    //res.sendStatus(404);
                }
                else {
                    docs.forEach((docs) => {
                        delete docs._id;
                    });
                    res.status(200).send(JSON.stringify(docs, null, 2));
                }
            }
        })

    });
    app.get(BASE_API_URL + "/employment-stats/:province", (request, response) => {
        var provincia = request.params.province;
        var from = request.query.from;
        var to = request.query.to;

        console.log(`New GET to /employment-stats/${provincia}`);

        if (from > to) {
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }

        db.find({ province: provincia }).skip(0).limit(employment_stats.length).exec((err, data) => {
            if (from != null && to != null) {
                data = data.filter((reg) => {
                    return (reg.period >= from && reg.period <= to);
                });

                if (data == 0) {
                    console.log(`Data not found /employment-stats: ${err}`);
                    res.status(404).send("Data not found");
                }
            }
            if (err) {
                console.log(`Error geting /employment-stats/${provincia}: ${err}`);
                response.sendStatus(500);
            } else {
                if (data.length != 0) {
                    console.log(`data returned ${data.length}`);
                    response.json(data.map((d) => {
                        delete d._id;
                        return d;
                    }));
                }
                else {
                    console.log(`Data not found /employment-stats/${provincia}: ${err}`);
                    response.status(404).send("Data not found");
                }
            }



        });
    });


    //GET ELEMENTO POR province Y period bien
    app.get(BASE_API_URL + "/employment-stats/:province/:period", (req, res) => {
        var data = req.params; //parametro solicitado

        db.find({ province: data.province, period: parseInt(data.period) }, (err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (docs == 0) {
                    res.sendStatus(404);
                } else {
                    delete docs[0]._id;
                    res.status(200).send(JSON.stringify(docs[0], null, 2));
                }
            }
        });
    });
    /*
    //GET PROVINCIA
    app.get(BASE_API_URL +"/employment-stats/:province", (req,res)=>{
        var data = req.params; //parametro solicitado
            
        db.find({province: data.province}, (err, docs) => {
            if (err) {
                res.sendStatus(500);
            } else {
                if (docs == 0) {
                    res.sendStatus(404);
                } else {
                    delete docs[0]._id;
                    res.status(200).send(JSON.stringify(docs[0], null, 2));
                }
            }
        });
    });
    */

    app.get(BASE_API_URL + "/employment-stats", (request, response) => {
        console.log("New GET to /employment-stats");
        db.find({}, (err, employment_stats) => {
            if (err) {
                console.log(`Error geting /employment-stats: ${err}`);
                response.sendStatus(500);
            } else {
                console.log(`data inserted: ${employment_stats.length}`);
                response.json(employment_stats.map((d) => {
                    delete d._id;
                    return d;
                }));
            }
        });

    });



    //////////////////////////////////////////////////////////////////////////////////////////////////
    //_______________________________________METODOS POST_____________________________________________
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    app.post(BASE_API_URL + "/employment-stats/:province/:period", (request, response) => {
        response.sendStatus(405, "Method not allowed");
    });


    app.post(BASE_API_URL + "/employment-stats", (request, response) => {
        var newStat = request.body;

        if (!newStat.period || !newStat.province || !newStat.population_over_16_years || !newStat.activity_men_percentage || !newStat.activity_women_percentage) {
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }
        else {
            db.find({ province: newStat.province, period: newStat.period }, function (err, data) {
                if (err) {
                    console.log(`Error posting /employment-stats: ${err}`);
                    response.sendStatus(500);
                }
                else {
                    if (data.length != 0) {
                        response.status(409).send("This resource already exists");
                    }
                    else {
                        db.insert(newStat, function (err, data) {
                            if (err) {
                                console.log(`Error posting /employment-stats: ${err}`);
                                response.sendStatus(500);
                            }
                            else {
                                console.log(`newStat = ${JSON.stringify(newStat, null, 2)}`);
                                console.log("New POST to /employment-stats");
                                response.status(201).send("Created");
                            }
                        });
                    }
                }
            });

        }
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //_______________________________________METODOS PUT_____________________________________________
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    app.put(BASE_API_URL + "/employment-stats", (request, response) => {
        response.sendStatus(405, "Method not allowed");
    });

    app.put(BASE_API_URL + "/employment-stats/:province", (request, response) => {
        response.sendStatus(405, "Method not allowed");
    });

    app.put(BASE_API_URL + "/employment-stats/:province/:period", (request, response) => {
        var newStat = request.body;
        var provincia = request.params.province;
        var periodo = parseInt(request.params.period);

        if (!newStat.period || !newStat.province || !newStat.population_over_16_years || !newStat.activity_men_percentage || !newStat.activity_women_percentage) {
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }
        else if (provincia !== request.body.province || periodo !== request.body.period) {
            console.log("El id no es igual al de la URL");
            response.status(400).send("Bad Request");
        } else {
            db.update({ province: provincia, period: parseInt(periodo) }, newStat, {}, function (err, data) {
                if (err) {
                    console.log(`Error put /employment-stats/${provincia}/${periodo}: ${err}`);
                    response.sendStatus(500);
                }
                else {
                    console.log(`Numero de documentos actualizados: ${data}`);
                    response.sendStatus(200);
                }
            });
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //_______________________________________METODOS DELETE_____________________________________________
    ////////////////////////////////////////////////////////////////////////////////////////////////////



    app.delete(BASE_API_URL + "/employment-stats", (request, response) => {
        db.remove({}, { multi: true }, function (err, dbRemoved) {
            if (err) {
                console.log(`Error deleting /employment-stats: ${err}`);
                response.sendStatus(500);
            } else {
                if (dbRemoved == 0) {
                    response.status(404).send("Not Found");
                }
                else {
                    console.log(`Files removed ${dbRemoved}`);
                    response.sendStatus(200);
                }
            }
        });
    });


    app.delete(BASE_API_URL + "/employment-stats/:province/:period", (request, response) => {
        var provincia = request.params.province;
        var periodo = parseInt(request.params.period);
        console.log(`New DELETE to /employment-stats/${provincia}`);

        db.remove({ province: provincia, period: parseInt(periodo) }, {}, function (err, dbRemoved) {
            if (err) {
                console.log(`Error deleting /apartment-occupancy-surveys/${provincia}: ${err}`);
                response.sendStatus(500);
            } else {
                if (dbRemoved == 0) {
                    response.status(404).send("Not Found");
                }
                else {
                    console.log(`Files removed ${dbRemoved}`);
                    response.sendStatus(200);
                }
            }
        });
    });



    //////////////////////////////////////////////////////////////////////////////////////////////////
    //_______________________________________FUNCIONES_____________________________________________
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function convertirAMinusculas(texto) {
        return texto.toLowerCase();
    }

    function paginacion(req, lista) {

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;

        if (limit < 1 || offset < 0 || offset > lista.length) {
            res.push("INCORRECT PARAMETERS");
            return res;
        }
        res = lista.slice(offset, parseInt(limit) + parseInt(offset));
        return res;

    }
    function verificarExistencia(valor) {
        const provincia = valor.query.province
        return new Promise((resolve, reject) => {
            db.findOne({ province: valor }, (err, doc) => {
                if (err) return reject(err);
                if (doc) return resolve(true);
                return resolve(false);
            });
        });
    }
    app.get(BASE_API_URL + "/data", (request, response) => {
        console.log(`New GET to /data`);

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        function v() { return getRandomInt(1, 100)};

        var data = new Array();

        for (var i = 0; i < 10; i++)

            data.push(v());
        
        response.json(data);

    });
};
export { loadBackend_RDQ_v2 };


