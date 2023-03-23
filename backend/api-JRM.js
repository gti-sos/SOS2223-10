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
        

    app.get(BASE_API_URL+"/economy-stats/loadInitialData", (request,response) => {
        console.log("New GET to /economy-stats/loadInitialData");
        db.find({}, function(err,data){
            if(err){
                console.log(`Error geting /economy-stats/loadInitialData: ${err}`);
                response.sendStatus(500);
            }
            else{
                if(data.length==0){
                    console.log(`data inserted: ${economy_stats.length}`);  
                    db.insert(economy_stats); 
                    response.json(economy_stats.map((d)=>{
                        delete d._id;
                        return d;
                    }));    
                }
                else{
                     console.log(`Data is already inserted: ${data.length}`);
                     response.status(200).send("Data is already inserted");          
                }
            }
        });
    });

    app.get(BASE_API_URL+"/economy-stats", (request,response) => {
        console.log("New GET to /economy-stats");
        var territorio = request.query.territory;
        var año = request.query.period;
        var casaFinalizada = request.query.finished_house;
        var precioMCuadrado = request.query.half_price_m_two;
        var turista = request.query.tourist;
        var from = request.query.from;
        var to = request.query.to;
        for(var i = 0; i<Object.keys(request.query).length;i++){
            var element = Object.keys(request.query)[i];
            if(element != "territory" && element != "period" && element != "finished_house" && element != "half_price_m_two" && element != "tourist" && element != "from" && element != "to" && element != "limit" && element != "offset"){
                console.log(`No se han recibido los campos esperados:`);
                response.status(400).send("Bad Request");
            }
        } 
        if(from>to){
            console.log(`No se han recibido los campos esperados:`);
            response.status(400).send("Bad Request");
        }
        db.find({},function(err, filtrado){
            
            if(err){
                console.log(`Error geting /economy-stats: ${err}`);
                response.sendStatus(500);
            }
            else{
                if(filtrado.length==0){
                    console.log(`data inserted: ${economy_stats.length}`);  
                    db.insert(economy_stats); 
                    response.json(economy_stats.map((d)=>{
                        delete d._id;
                        return d;
                    })); 
                }
                else{
                    if (territorio != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                        
                            return (reg.territory == territorio);
                        }); 
                        if (filtrado==0){
                            console.log("LLega hasta aqui");

                            console.log(`Data not found /economy-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (año != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.period == año);
                        });
                        if (filtrado==0){
                            console.log(`Data not found /economy-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (casaFinalizada != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.finished_house == casaFinalizada);
                        });
        
                        if (filtrado==0){
                            console.log(`Data not found /economy-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (precioMCuadrado != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.half_price_m_two == precioMCuadrado);
                        });
        
                        if (filtrado==0){
                            console.log(`Data not found /economy-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (turista != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.tourist == turista);
                        });
        
                        if (filtrado==0){
                            console.log(`Data not found /economy-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if(from != null && to != null){
                        filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.period >= from && reg.period <=to);
                        });
        
                        if (filteredList==0){
                            console.log(`Data not found /economy-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }    
                    }
                    if(request.query.limit != undefined || request.query.offset != undefined){
                        filtrado = paginacion(request,filtrado);
                    }
                    
                    filtrado.forEach((element)=>{
                        delete element._id;
                    });
        
                    if(request.query.fields!=null){
                        
                        var listaFields = request.query.fields.split(",");
                        for(var i = 0; i<listaFields.length;i++){
                            var element = listaFields[i];
                            if(element != "territory" && element != "period" && element != "finished_house" && element != "half_price_m_two" && element != "tourist"){
                                console.log(`No se han recibido los campos esperados:`);
                                response.status(400).send("Bad Request");
                            }
                        }
                    }
                    response.send(JSON.stringify(filtrado,null,2));
        
                }
            }            
        });
        
    });
    
    app.get(BASE_API_URL+"/economy-stats/:territory", (request,response) => {
        var territorio = request.params.territory;

        console.log(`New GET to /economy-stats/${territorio}`);

        db.find({territory : territorio}).skip(0).limit(economy_stats.length).exec((err, data) =>{
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
    /*
    app.get(BASE_API_URL+"/economy-stats/:period", (request,response) => {
        var año = parseInt(request.params.period);
        console.log(`New GET to /economy-stats/${año}`);
        db.find({$and: [{period:año}]}).exec(function(err,data){
            if(err){
                console.log(`Error geting /economy-stats/${año}: ${err}`);
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
                    console.log(`Data not found /economy-stats/${año}: ${err}`);
                    response.status(404).send("Data not found");
                 }    
            }
        })
        
    });
    */

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

    
    app.delete(BASE_API_URL +"/economy-stats/:territory",(request, response)=>{
        var territorio = request.params.territory;

        console.log(`New DELETE to /economy-stats/${territorio}`);

        db.remove({territory:territorio},{multi:true},function (err, dbRemoved){
            if(err){
                console.log(`Error deleting /apartment-occupancy-surveys/${territorio}: ${err}`);
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

    function paginacion(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
            return res;
        }
    
        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;
    
    };

    

}


//https://documenter.getpostman.com/view/25969218/2s93JzMgXV
