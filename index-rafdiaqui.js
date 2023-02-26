var datos_rafa = new Array();
var filtrado = new Array();
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
console.log(datos_rafa);
var filtrado = datos_rafa.filter(v => v.province=="jaen");
var suma=0;
for (let i=0;i<filtrado.length;i++){
    var suma = suma + filtrado[i].population_over_16_years;
}
var media =  suma/filtrado.length;
console.log("La poblacion mayor de 16 años en jaen de media es "+media)
console.log(media)