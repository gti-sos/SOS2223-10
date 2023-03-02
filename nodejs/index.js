var express = require("express");

var cool = require("cool-ascii-faces");

var app = express();
var port = process.env.PORT || 12345;

app.get("/faces", (request,response) => {
    response.send(cool());
    console.log("New request");
});


app.listen(port, ()=>{
    console.log(`Server ready in port ${port}`);
});



//Datos Joaquín
app.get("/samples/JRM", (request,response) => {
    var datos_joaquin = [
        {period:1999, territory:"Jaén", finished_house:3704, half_price_m_two:440, tourist:857295},
        {period:1998, territory:"Sevilla", finished_house:7176, half_price_m_two:534, tourist:1247438},
        {period:2000, territory:"Cádiz", finished_house:13501, half_price_m_two:644, tourist:2682429},
        {period:2000, territory:"Granada", finished_house:3672, half_price_m_two:644, tourist:2228642},
        {period:2008, territory:"Almería", finished_house:16746, half_price_m_two:1674, tourist:2225479},
        {period:2011, territory:"Sevilla", finished_house:6667, half_price_m_two:1576, tourist:2732934},
        {period:2012, territory:"Malaga", finished_house:3797, half_price_m_two:1618, tourist:7073502},
        {period:2012, territory:"Sevilla", finished_house:6313, half_price_m_two:1414, tourist:2673617},
        {period:2013, territory:"Sevilla", finished_house:2790, half_price_m_two:1296, tourist:2616499},
        {period:2013, territory:"Cordoba", finished_house:1384, half_price_m_two:1202, tourist:1333216},
    ];

    var datos = datos_joaquin.filter(ciudad => ciudad.territory == "Sevilla");
    media = 0;
    suma = 0;
    for (let i =0;i<datos.length;i++){
        var suma = suma + datos[i].tourist;
        //var media =  suma/datos.length;
    }

    console.log("La media de turistas en Sevilla es: ",suma/datos.length);
});


//Datos Rafa
app.get("/samples/RDQ", (request,response) => {
    var datos_rafa = [
        {period:1998,province:"sevilla",population_over_16_years:1349525,activity_men_percentage:65.5,activity_women_percentage:36.3},
        {period:1999,province:"granada",population_over_16_years:652275,activity_men_percentage:60.2,activity_women_percentage:35.3},
        {period:2004,province:"jaen",population_over_16_years:527475,activity_men_percentage:64.3,activity_women_percentage:37.9},
        {period:2006,province:"huelva",population_over_16_years:403650,activity_men_percentage:65.8,activity_women_percentage:40.0},
        {period:2007,province:"malaga",population_over_16_years:1242900,activity_men_percentage:68.1,activity_women_percentage:47.0},
        {period:2009,province:"cadiz",population_over_16_years:995375,activity_men_percentage:67.9,activity_women_percentage:45.6},
        {period:2011,province:"almeria",population_over_16_years:557825,activity_men_percentage:71.5,activity_women_percentage:57.2},
        {period:2012,province:"jaen",population_over_16_years:550700,activity_men_percentage:63.2,activity_women_percentage:46.0},
        {period:2014,province:"sevilla",population_over_16_years:1571050,activity_men_percentage:65.6,activity_women_percentage:53.8},
        {period:2014,province:"almeria",population_over_16_years:587775,activity_men_percentage:69.2,activity_women_percentage:53.6}
    
    ];
    var filtrado = datos_rafa.filter(v => v.province=="jaen");
    var suma=0;
    for (let i=0;i<filtrado.length;i++){
        var suma = suma + filtrado[i].population_over_16_years;
    }
    var media =  suma/filtrado.length;
    //console.log("La poblacion mayor de 16 años en jaen de media es "+media)
    response.send(`La media de la poblacion mayor de 16 años en jaen es: ${media}`)
    console.log("New request");
});

//Datos Rushabh
var raw_data = [ 
    {year:2016, city:"Almería", protected_space:18, area: 163.937, fire: 57},
    {year:2016, city:"Cádiz", protected_space:29, area: 231.22, fire: 108},
    {year:2016, city:"Córdoba", protected_space:19, area: 134.597, fire: 90},
    {year:2016, city:"Granada", protected_space:17, area: 220.314, fire: 119},
    {year:2016, city:"Huelva", protected_space:24, area: 319.11, fire: 155},
    {year:2016, city:"Jaén", protected_space:17, area: 317.381, fire: 172},
    {year:2016, city:"Málaga", protected_space:28, area: 89.272, fire: 111},
    {year:2016, city:"Sevilla", protected_space:24, area: 220.868, fire: 124},
    {year:2017, city:"Almería", protected_space:18, area: 163.937, fire: 87},
    {year:2017, city:"Cádiz", protected_space:29, area: 231.22, fire: 94},
    {year:2017, city:"Córdoba", protected_space:19, area: 134.597, fire: 78},
  ]
  
  avg  = 0;
  sum = 0;
  avg1=0;
  sum2=0;
  var data = raw_data.filter(cities => cities.city == "Almería" );
  var data2 = raw_data.filter(cities => cities.city == "Córdoba" );
  
  for (let i =0;i<data.length;i++){
      var sum = sum + data[i].fire;
      var avg =  sum/data.length;
  }
  for (let i =0;i<data2.length;i++){
      var sum2 = sum2 + data2[i].fire;
      var avg1 =  sum2/data2.length;
  }
  
  console.log("Fire avg in Almería is ", avg);
  
  
  console.log(data);