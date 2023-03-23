
var Datastore = require('nedb');
var db = new Datastore();
const BASE_API_URL = "/api/v1";
const express = require('express');

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
    //tildes
    function stripAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
  //  db.insert(environment_stats);


    app.get(BASE_API_URL+"/environment-stats/loadInitialData", (req,res) => {
       
        db.find({},function(err, docs){

           if(err){
               res.sendStatus(500, "ERROR IN CLIENT");
               return;
           }
           else{
               db.remove({}, { multi: true }, (err,num)=>{
                   if (err){
                       res.sendStatus(500,"ERROR IN CLIENT");
                       return;
                   }
                   return;
               });
       var iniData = [ { year: 2016, city: "Almería", protected_space: 18, area: 163.937, fire: 57 },
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
       iniData.forEach( (e) => {
           db.insert(e);
       });
       res.sendStatus(200,"OK");
   }
   });
  });

 
app.get(BASE_API_URL + "/environment-stats", (req, res) => {
    db.find({}, { _id: 0 }, function(err, docs) {
        if (err) {
            res.status(500).send("ERROR IN CLIENT");
        } else {
            if (docs.length === 0) {
                res.json([]);
            } else {
                res.json(docs);
            }
        }
    });
});



app.get(BASE_API_URL + "/environment-stats/:city", (req, res) => {
    var iuvcity = req.params.city;
    //búsqueda
    db.find({city: iuvcity}, function(err,docs){
        if(err){
            res.sendStatus(500, "ERROR IN CLIENT");
            return;
        }
        else{
            if(docs == 0){
                res.sendStatus(404, "NOT FOUND")
            }
            else{
                docsCopy = docs;
                docsCopy.forEach((e) => {
                    delete e._id;
                })
                res.send(JSON.stringify(docsCopy,null,2));
            }
        }
    });
});




app.get(BASE_API_URL + "/environment-stats/:city/:year", (req, res) => {
    var iuvcity = req.params.city;
    var iuvYear = req.params.year;
    db.find({city: iuvcity, year: parseInt(iuvYear)}, function(err,docs){
        if(err){
            res.sendStatus(500,  "ERROR IN CLIENT");
            return;
        }
        else{
            if(docs == 0){
                res.sendStatus(404, "NOT FOUND")
            }
            else{
                docsCopy = docs;
                docsCopy.forEach((e) => {
                    delete e._id;
                })
                res.send(JSON.stringify(docsCopy[0],null,2));
            }
        }
    });
});






    // FUNCION COMPROBAR QUERYS
    function compruebaQuery(e) {
        if(e.length == 0){
            return true;
        }
        else{
            for (var i = 0; i < e.length; i++) {
                var query = e[i];
                if (query != "year" && query != "from" && query != "to" && query != "limit" && query != "offset") {
                    return false;
                }
            }
        }
    }


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
            db.write();
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
    

    app.get(BASE_API_URL +"/environment-stats/docs", (req, res) => {
        console.log("Se ejecuta");
        res.status(301).redirect("https://documenter.getpostman.com/view/26063123/2s93JzN1dM");
    
    });

}


