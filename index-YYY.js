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
    var media =  suma/datos.length;
}

console.log("La media de turistas en Sevilla es: ", media);

