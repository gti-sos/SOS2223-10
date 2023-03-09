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