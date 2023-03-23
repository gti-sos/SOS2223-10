const { response } = require('express');
var Datastore = require('nedb');
var db = new Datastore();
const BASE_API_URL = "/api/v1";
module.exports = (app) =>{
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
console.log("Datos insertados");
    
app.get(BASE_API_URL+"/employment-stats", (request,response) => {
    console.log("New GET to /employment-stats");
    db.find({},(err,employment_stats) => {
        if(err){
            console.log(`Error geting /employment-stats: ${err}`);
            response.sendStatus(500);
        }else{
            console.log(`data inserted: ${employment_stats.length}`);
            response.json(employment_stats.map((d)=>{
                delete d._id;
                return d;
            }));                           
        }
    });
    
});


app.get(BASE_API_URL+"/employment-stats/loadInitialData", (request,response) => {
    console.log("New GET to /employment-stats/loadInitialData");
    db.find({}, function(err,data){
        if(err){
            console.log(`Error geting /employment-stats/loadInitialData: ${err}`);
            response.sendStatus(500);
        }
        else{
            if(data.length==0){
                console.log(`data inserted: ${employment_stats.length}`);  
                db.insert(employment_stats); 
                response.json(employment_stats.map((d)=>{
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
//activity_women_percentage
/*
app.get(BASE_API_URL+"/employment-stats/:activity_women_percentage", (request,response) => {
    var mujer = request.params.activity_men_percentage;
    console.log(`New GET to /employment-stats/${mujer}`);

    db.find({activity_women_percentage : mujer}).skip(0).limit(employment_stats.length).exec((err, data) =>{
        if(err){
            console.log(`Error geting /employment-stats/${mujer}: ${err}`);
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
                console.log(`Data not found /employment-stats/${mujer}: ${err}`);
                response.status(404).send("Data not found");
             }        
        }
    });
});
//activity_men_percentage
app.get(BASE_API_URL+"/employment-stats/:activity_men_percentage", (request,response) => {
    var hombre = request.params.activity_men_percentage;
    console.log(`New GET to /employment-stats/${meyor}`);

    db.find({activity_men_percentage : hombre}).skip(0).limit(employment_stats.length).exec((err, data) =>{
        if(err){
            console.log(`Error geting /employment-stats/${hombre}: ${err}`);
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
                console.log(`Data not found /employment-stats/${hombre}: ${err}`);
                response.status(404).send("Data not found");
             }        
        }
    });
});

//population_over_16_years
app.get(BASE_API_URL+"/employment-stats/:population_over_16_years", (request,response) => {
    var mayor = request.params.population_over_16_years;
    console.log(`New GET to /employment-stats/${meyor}`);

    db.find({population_over_16_years : mayor}).skip(0).limit(employment_stats.length).exec((err, data) =>{
        if(err){
            console.log(`Error geting /employment-stats/${periodo}: ${err}`);
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
                console.log(`Data not found /employment-stats/${mayor}: ${err}`);
                response.status(404).send("Data not found");
             }        
        }
    });
});
//anyo
app.get(BASE_API_URL+"/employment-stats/:period", (request,response) => {
    var periodo = request.params.period;

    console.log(`New GET to /employment-stats/${periodo}`);

    db.find({period : periodo}).skip(0).limit(employment_stats.length).exec((err, data) =>{
        if(err){
            console.log(`Error geting /employment-stats/${periodo}: ${err}`);
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
                console.log(`Data not found /employment-stats/${periodo}: ${err}`);
                response.status(404).send("Data not found");
             }        
        }
    });
});
//provincia
app.get(BASE_API_URL+"/employment-stats/:province", (request,response) => {
    var provincia = request.params.province;

    console.log(`New GET to /employment-stats/${provincia}`);

    db.find({province : provincia}).skip(0).limit(employment_stats.length).exec((err, data) =>{
        if(err){
            console.log(`Error geting /employment-stats/${provincia}: ${err}`);
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
                console.log(`Data not found /employment-stats/${provincia}: ${err}`);
                response.status(404).send("Data not found");
             }        
        }
    });
});
*/
app.post(BASE_API_URL+"/employment-stats/:province",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});


app.post(BASE_API_URL+"/employment-stats", (request,response) => {
    var newStat = request.body;

    if(!newStat.period || !newStat.province || !newStat.population_over_16_years || !newStat.activity_men_percentage || !newStat.activity_women_percentage){
        console.log(`No se han recibido los campos esperados:`);
        response.status(400).send("Bad Request");
    }
    else{
        db.find({province: newStat.province, period:newStat.period}, function(err, data){
            if(err){
                console.log(`Error posting /employment-stats: ${err}`);
                response.sendStatus(500);
            }
            else{
                if(data.length!=0){
                    response.status(409).send("This resource already exists");
                }
                else{
                    db.insert(newStat, function(err, data){
                        if(err){
                            console.log(`Error posting /employment-stats: ${err}`);
                            response.sendStatus(500);
                        }
                        else{
                            console.log(`newStat = ${JSON.stringify(newStat,null,2)}`);
                            console.log("New POST to /employment-stats");
                            response.status(201).send("Created");
                        }
                    });
                }
            }
        });
        
    }        
});

app.put(BASE_API_URL + "/employment-stats",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});

app.put(BASE_API_URL + "/employment-stats/:province",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});

app.put(BASE_API_URL+"/employment-stats/:province/:period", (request,response) => {
    var newStat = request.body;
    var provincia = request.params.province;
    var periodo = parseInt(request.params.period);
    
    if(!newStat.period || !newStat.province || !newStat.population_over_16_years || !newStat.activity_men_percentage || !newStat.activity_women_percentage){
        console.log(`No se han recibido los campos esperados:`);
        response.status(400).send("Bad Request");
    }else{
        db.update({$and: [{provinve:provincia}, {period:periodo}]}, {$set: newStat},function(err, data){
            if(err){
                console.log(`Error put /employment-stats/${provincia}/${periodo}: ${err}`);
                response.sendStatus(500);
            }
            else{
                console.log(`Numero de documentos actualizados: ${data}`);
                response.sendStatus(200);  
                }
        });
    }
});




app.delete(BASE_API_URL +"/employment-stats",(request, response)=>{
    db.remove({}, {multi:true},function (err, dbRemoved){
        if(err){
            console.log(`Error deleting /employment-stats: ${err}`);
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


app.delete(BASE_API_URL +"/employment-stats/:province",(request, response)=>{
    var provincia = request.params.province;

    console.log(`New DELETE to /employment-stats/${provincia}`);

    db.remove({province:provincia},{multi:true},function (err, dbRemoved){
        if(err){
            console.log(`Error deleting /apartment-occupancy-surveys/${provincia}: ${err}`);
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

app.get(BASE_API_URL +"/employment-stats/docs", (req, res) => {
    console.log("Se ejecuta");
    res.status(301).redirect("https://documenter.getpostman.com/view/25969335/2s93JzM1Bb");

});

app.get(BASE_API_URL+"/employment-stats", (request,response) => {
        console.log("New GET to /employment-stats");
        var provincia = request.query.province;
        var periodo = request.query.period;
        var poblacionMayor16 = request.query.population_over_16_years;
        var actividadHombres = request.query.activity_men_percentage;
        var actividadMujeres = request.query.activity_women_percentage;
        var from = request.query.from;
        var to = request.query.to;
        for(var i = 0; i<Object.keys(request.query).length;i++){
            var element = Object.keys(request.query)[i];
            if(element != "province" && element != "period" && element != "population_over_16_years" && element != "activity_men_percentage" && element != "activity_women_percentage" && element != "from" && element != "to" && element != "limit" && element != "offset"){
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
                console.log(`Error geting /employment-stats: ${err}`);
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
                    if (provincia != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            //console.log("El filtrado es"+filtrado);
                            return (reg.province == provincia);
                        }); 
                        if (filtrado==0){
                            console.log("LLega hasta aqui");

                            console.log(`Data not found /employment-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (periodo != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.period == periodo);
                        });
                        if (filtrado==0){
                            console.log(`Data not found /employment-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (poblacionMayor16 != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.population_over_16_years == poblacionMayor16);
                        });
        
                        if (filtrado==0){
                            console.log(`Data not found /employment-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (actividadHombres != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.activity_men_percentage == actividadHombres);
                        });
        
                        if (filtrado==0){
                            console.log(`Data not found /employment-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if (actividadMujeres != null){
                        var filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.activity_women_percentage == actividadMujeres);
                        });
        
                        if (filtrado==0){
                            console.log(`Data not found /employment-stats: ${err}`);
                            response.status(404).send("Data not found");
                        }
                    }
                    if(from != null && to != null){
                        filtrado = filtrado.filter((reg)=>
                        {
                            return (reg.period >= from && reg.period <=to);
                        });
        
                        if (filteredList==0){
                            console.log(`Data not found /employment-stats: ${err}`);
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
                        //Comprobamos si los campos son correctos
                        var listaFields = request.query.fields.split(",");
                        for(var i = 0; i<listaFields.length;i++){
                            var element = listaFields[i];
                            if(element != "province" && element != "period" && element != "population_over_16_years" && element != "activity_men_percentage" && element != "activity_women_percentage"){
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



   
}


