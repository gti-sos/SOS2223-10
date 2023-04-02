const { response } = require('express');
var Datastore = require('nedb');
var db = new Datastore();
const BASE_API_URL = "/api/v1";
module.exports = (app) => {
    var economy_stats = [
        { period: 1999, territory: "Jaén", finished_house: 3704, half_price_m_two: 440, tourist: 857295 },
        { period: 1998, territory: "Sevilla", finished_house: 7176, half_price_m_two: 534, tourist: 1247438 },
        { period: 2000, territory: "Cádiz", finished_house: 13501, half_price_m_two: 644, tourist: 2682429 },
        { period: 2000, territory: "Granada", finished_house: 3672, half_price_m_two: 644, tourist: 2228642 },
        { period: 2008, territory: "Almería", finished_house: 16746, half_price_m_two: 1674, tourist: 2225479 },
        { period: 2011, territory: "Sevilla", finished_house: 6667, half_price_m_two: 1576, tourist: 2732934 },
        { period: 2012, territory: "Málaga", finished_house: 3797, half_price_m_two: 1618, tourist: 7073502 },
        { period: 2012, territory: "Sevilla", finished_house: 6313, half_price_m_two: 1414, tourist: 2673617 },
        { period: 2013, territory: "Sevilla", finished_house: 2790, half_price_m_two: 1296, tourist: 2616499 },
        { period: 2013, territory: "Córdoba", finished_house: 1384, half_price_m_two: 1202, tourist: 1333216 },
    ];

    db.insert(economy_stats);
        

    app.get(BASE_API_URL+"/economy-stats/loadInitialData", (req,res) => {
        console.log("New GET to /economy-stats/loadInitialData");
        db.find({}, function(err,data){
            if(err){
                console.log(`Error geting /economy-stats/loadInitialData: ${err}`);
                res.sendStatus(500);
            }
            else{
                if(data.length==0){
                    console.log(`data inserted: ${economy_stats.length}`);  
                    db.insert(economy_stats); 
                    res.json(economy_stats.map((d)=>{
                        delete d._id;
                        return d;
                    }));    
                }
                else{
                     console.log(`Data is already inserted: ${data.length}`);
                     res.status(200).send("Data is already inserted");          
                }
            }
        });
    });

    app.get(BASE_API_URL + "/economy-stats", (req, res) => {
        const query = req.query;
        const dbquery = {};
        console.log("New GET to /economy-stats/");
        console.log(query.period);
      
        let limit = Number.MAX_SAFE_INTEGER;
        let offset = 0;

        var from = req.query.from;
        var to = req.query.to;

        if(from>to){
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
      
        if (query.territory) {
          dbquery['territory'] = query.territory;
        }
      
        if (query.period) {
          dbquery['period'] = parseInt(query.period);
          console.log(offset);
        }
      
        if (query.finished_house) {
          dbquery['finished_house'] = parseInt(query.finished_house);
        }
      
        if (query.half_price_m_two) {
          dbquery['half_price_m_two'] = parseInt(query.half_price_m_two);
        }
      
        if (query.tourist) {
          dbquery['tourist'] = parseInt(query.tourist);
        }
        console.log(dbquery);

        
      
        db.find(dbquery).skip(offset).limit(limit).exec((err, docs) => {
          console.log(docs);

          if(from != null && to != null){
            docs = docs.filter((reg)=>
            {
                return (reg.period >= from && reg.period <=to);
            });

            if (docs==0){
                console.log(`Data not found /economy-stats: ${err}`);
                res.status(404).send("Data not found");
            }    
          }

          if (err) {
            res.sendStatus(500);
          } else {
            if (docs == 0) {
              docs.forEach((data) => {
                delete data._id;
              });
              res.status(200).send(JSON.stringify(docs, null, 2));
              // res.sendStatus(404);
            } else {
              docs.forEach((data) => {
                delete data._id;
                });
              res.status(200).send(JSON.stringify(docs, null, 2));
            }
            
          }
        });
    });
    
    app.get(BASE_API_URL+"/economy-stats/:territory", (request,response) => {
        var territorio = request.params.territory;
        var from = request.query.from;
        var to = request.query.to;
        
         console.log(`New GET to /economy-stats/${territorio}`);

        if(from>to){
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }

        db.find({territory : territorio}).skip(0).limit(economy_stats.length).exec((err, data) =>{
            if(from != null && to != null){
                data = data.filter((reg)=>
                {
                    return (reg.period >= from && reg.period <=to);
                });
    
                if (data==0){
                    console.log(`Data not found /economy-stats: ${err}`);
                    res.status(404).send("Data not found");
                }    
            }
            if(err){
                console.log(`Error geting /economy-stats/${territorio}: ${err}`);
                response.sendStatus(500);
            }else{
                if(data.length!= 0){
                    console.log(`data returned ${data.length}`);
                    response.json(data.map((d)=>{
                        delete d._id;
                        return d;
                    }));
                }
                 else{
                    console.log(`Data not found /economy-stats/${territorio}: ${err}`);
                    response.status(404).send("Data not found");
                 }        
            }
            


        });
    });

    app.get(BASE_API_URL +"/economy-stats/:territory/:period", (req,res)=>{
        var data = req.params; //parametro solicitado
            
        db.find({territory: data.territory, period: parseInt(data.period)}, (err, docs) => {
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

    app.post(BASE_API_URL+"/economy-stats/:territory",(request,response)=>{
        response.sendStatus(405, "Method not allowed");
    });


    app.post(BASE_API_URL+"/economy-stats", (request,response) => {
        var newStat = request.body;

        if(!newStat.period || !newStat.territory || !newStat.finished_house || !newStat.half_price_m_two || !newStat.tourist){
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }
        else{
            db.find({territory: newStat.territory, period:newStat.period}, function(err, data){
                if(err){
                    console.log(`Error posting /economy-stats: ${err}`);
                    response.sendStatus(500);
                }
                else{
                    if(data.length!=0){
                        response.status(409).send("This resource already exists");
                    }
                    else{
                        db.insert(newStat, function(err, data){
                            if(err){
                                console.log(`Error posting /economy-stats: ${err}`);
                                response.sendStatus(500);
                            }
                            else{
                                console.log(`newStat = ${JSON.stringify(newStat,null,2)}`);
                                console.log("New POST to /economy-stats");
                                response.status(201).send("Created");
                            }
                        });
                    }
                }
            });
            
        }        
    });
     

    app.put(BASE_API_URL + "/economy-stats",(request,response)=>{
        response.sendStatus(405, "Method not allowed");
    });

    app.put(BASE_API_URL + "/economy-stats/:territory",(request,response)=>{
        response.sendStatus(405, "Method not allowed");
    });

    app.put(BASE_API_URL+"/economy-stats/:territory/:period", (request,response) => {
        var newStat = request.body;
        var territorio = request.params.territory;
        var año = parseInt(request.params.period);

        if(!newStat.period || !newStat.territory || !newStat.finished_house || !newStat.half_price_m_two || !newStat.tourist){
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }else if(territorio !== request.body.territory || año !== request.body.period) {
            console.log("El id no es igual al de la URL");
            response.status(400).send("Bad Request");
        }else{
            db.update({$and: [{territory:territorio}, {period:año}]}, {$set: newStat},function(err, data){
                if(err){
                    console.log(`Error put /economy-stats/${territorio}/${año}: ${err}`);
                    response.sendStatus(500);
                }
                else{
                    console.log(`Numero de documentos actualizados: ${data}`);
                    response.sendStatus(200);  
                    }
            });
        }
    });

    


    app.delete(BASE_API_URL +"/economy-stats",(request, response)=>{
        db.remove({}, {multi:true},function (err, dbRemoved){
            if(err){
                console.log(`Error deleting /economy-stats: ${err}`);
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

    
    app.delete(BASE_API_URL +"/economy-stats/:territory/:period",(request, response)=>{
        var territorio = request.params.territory;
        var año = parseInt(request.params.period);
        console.log(`New DELETE to /employment-stats/${territorio}/${año}`);
    
        db.remove({territory:territorio,period:parseInt(año)},{},function (err, dbRemoved){
            if(err){
                console.log(`Error deleting /apartment-occupancy-surveys/${territorio}/${año}: ${err}`);
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

}


//https://documenter.getpostman.com/view/25969218/2s93JzMgXV