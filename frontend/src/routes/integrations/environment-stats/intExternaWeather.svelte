<script>
  // @ts-nocheck

  import * as echarts from "echarts";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import axios from "axios";

  let API = "/api/v3/environment-stats";
  if (dev) API = "http://localhost:12345" + API;

  let result = "";
  let resultStatus = "";
  let apiData = "";

  const cityCoordinates = {
    Cordoba: {
      latitude: 37.888175,
      longitude: -4.779383,
    },
    Sevilla: {
      latitude: 37.389092,
      longitude: -5.984459,
    },
    Jaen: {
      latitude: 37.779594,
      longitude: -3.784909,
    },
    Granada: {
      latitude: 37.176487,
      longitude: -3.597929,
    },
    Malaga: {
      latitude: 36.721273,
      longitude: -4.421399,
    },
    Huelva: {
      latitude: 37.261421,
      longitude: -6.944722,
    },
    Almeria: {
      latitude: 36.83814,
      longitude: -2.459743,
    },
    Cadiz: {
      latitude: 36.527061,
      longitude: -6.288596,
    },
  };

  let cityDictionary = {
    Córdoba: "Q101948176",
    Sevilla: "Q8717",
    Jaén: "Q95025",
    Granada: "Q8810",
    Huelva: "Q23984786",
    Cádiz: "Q15682",
    Almería: "Q10400",
    Málaga: "Q116450968",
  };

  let API_URL = "https://sos2223-10.ew.r.appspot.com/api/v3/environment-stats";

  async function loadEchart(apiData, weatherData) {
    // Obtener el elemento HTML donde se mostrará la gráfica
    const chartElement = document.getElementById("chart");

    // Crear la instancia de ECharts
    const chart = echarts.init(chartElement);

    // Configurar las opciones de la gráfica
    const options = {
      title: {
        text: "Datos de ciudad, incendios y temperatura",
      },
      tooltip: {},
      legend: {
        data: ["Incendios", "Temperatura"],
      },
      xAxis: {
        data: apiData.map((data) => data.city),
      },
      yAxis: [
        {
          name: "Incendios",
          type: "value",
        },
        {
          name: "Temperatura",
          type: "value",
        },
      ],
      series: [
        {
          name: "Incendios",
          type: "bar",
          data: apiData.map((data) => data.fire),
        },
        {
          name: "Temperatura",
          type: "line",
          yAxisIndex: 1,
          data: apiData.map((data) => weatherData[data.city]?.current?.temp_c),
        },
      ],
    };

    // Mostrar la gráfica
    chart.setOption(options);
  }

   async function loadEchart2(apiData, airData) {
    // Obtener el elemento HTML donde se mostrará la gráfica
    const chartElement = document.getElementById("chart2");

    // Crear la instancia de ECharts
    const chart = echarts.init(chartElement);

    const cities = [...new Set(apiData.map((data) => data.city))];


    // Configurar las opciones de la gráfica
    const options = {
      title: {
        text: "Datos de ciudad, incendios, PM10 y PM25",
      },
      tooltip: {},
      legend: {
        data: ["Incendios", "PM10", "PM25"],
      },
      xAxis: {
        data: cities,
      },
      yAxis: [
        {
          name: "Incendios",
          type: "value",
        },
        {
          name: "PM",
          type: "value",
        },
      ],
      series: [
        {
          name: "Incendios",
          type: "scatter",
          symbolSize: 10,
          data: apiData.map((data) => [data.city, data.fire]),
        },
        {
          name: "PM10",
          type: "scatter",
          symbolSize: 10,
          yAxisIndex: 1,
          data: apiData.map((data) => [
            data.city,
            airData[data.city]?.data[0]?.pm10,
          ]),
        },
        {
          name: "PM25",
          type: "scatter",
          symbolSize: 10,
          yAxisIndex: 1,
          data: apiData.map((data) => [
            data.city,
            airData[data.city]?.data[0]?.pm25,
          ]),
        },
      ],
    };

    // Mostrar la gráfica
    chart.setOption(options);
  } 
  async function loadEcharts3(cricketData) {
    // Filtrar los datos para obtener los valores de interés
    const filteredData = cricketData.values.slice(0, 10); // Obtener hasta 10 jugadores
    const names = filteredData.map((item) => item.values[1]);
    const runs = filteredData.map((item) => parseInt(item.values[4]));

    // Obtener el elemento HTML donde se mostrará la gráfica
    const chartElement = document.getElementById("chart3");

    // Crear la instancia de ECharts
    const chart = echarts.init(chartElement);

    // Configurar las opciones de la gráfica
    const options = {
      title: {
        text: "Runs de jugadores de cricket",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: names,
      },
      yAxis: {
        type: "value",
        name: "Runs",
      },
      series: [
        {
          name: "Runs",
          type: "line",
          smooth: true,
          areaStyle: {},
          data: runs,
        },
      ],
    };

    // Establecer las opciones en la gráfica
    chart.setOption(options);
  }

  function loadEcharts4(coins) {
    const chartData = coins.data.coins.map((coin) => ({
      name: coin.name,
      value: parseFloat(coin.price),
    }));

    const chart = echarts.init(document.getElementById("chart4"));

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: ${c}",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: chartData.map((coin) => coin.name),
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    chart.setOption(option);
  }

  

  async function getData() {
    resultStatus = result = "";

    // Llamada a la API original
    const res = await fetch(API, {
      method: "GET",
    });
    try {
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      apiData = dataReceived;
    } catch (error) {
      console.log(`Error parseando el resultado de la API: ${error}`);
    }

    const weatherData = {};
    for (const cityData of apiData) {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: `${cityData.city}` },
        headers: {
          "X-RapidAPI-Key":
            "e52c3722d9msha0d5beb871b5cd4p1175cbjsnfae869968c4f",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      try {
        const weatherResponse = await axios.request(options);
        const weatherDataForCity = weatherResponse.data;
        weatherData[cityData.city] = weatherDataForCity;
      } catch (error) {
        console.log(
          `Error obteniendo el clima para ${cityData.city}: ${error}`
        );
      }
    }

     const airData = {};
     for (const cityData of apiData) {
      const city = cityData.city;
      const coordinates = cityCoordinates[city];

      if (coordinates) {
        const lat = coordinates.latitude;
        const lon = coordinates.longitude;

        const options = {
          method: "GET",
          url: "https://air-quality.p.rapidapi.com/current/airquality",
          params: {
            lon: lon,
            lat: lat,
          },
          headers: {
            //  'X-RapidAPI-Key': 'e52c3722d9msha0d5beb871b5cd4p1175cbjsnfae869968c4f',
          //  "X-RapidAPI-Key": "dff350a5e9msh0576314cd591864p1be088jsn092c880c0a12",
          'X-RapidAPI-Key': '1e9cbc92ffmshcd2acf78a6e6212p187ea5jsn23d868ef2151',


            "X-RapidAPI-Host": "air-quality.p.rapidapi.com",
          },
        };

        try {
          const airResponse = await axios.request(options);
          const airDataForCity = airResponse.data;
          airData[cityData.city] = airDataForCity;
          console.log(airData);
        } catch (error) {
          console.error(
            `Error obteniendo la calidad del aire para ${city}: ${error}`
          );
        }
      } else {
        console.warn(`No se encontraron coordenadas para ${city}.`);
      }
    }  


    

      console.log("a");
      loadEchart(apiData, weatherData);
     loadEchart2(apiData, airData);
      
    }
  

  let cricketData = {};
  async function getData2() {
    const options = {
      method: "GET",
      url: "https://cricbuzz-cricket.p.rapidapi.com/stats/v1/team/2",
      params: {
        statsType: "mostRuns",
        year: "2020",
      },
      headers: {
        "X-RapidAPI-Key": "dff350a5e9msh0576314cd591864p1be088jsn092c880c0a12",
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      cricketData = response.data;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    loadEcharts3(cricketData);
  }
  let coins = {};
  async function getData3() {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "10",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Key": "dff350a5e9msh0576314cd591864p1be088jsn092c880c0a12",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      coins = response.data;
      console.log(coins);
    } catch (error) {
      console.error(error);
    }

    loadEcharts4(coins);
  }




  let populationData = {};

async function fetchData(city) {
  
  
  const cityId = cityDictionary[city];
  const options = {
    method: "GET",
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`,
    headers: {
      "X-RapidAPI-Key": "dff350a5e9msh0576314cd591864p1be088jsn092c880c0a12",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const populationResponse = await axios.request(options);
        const populationForCity = populationResponse.data;
        populationData[city] = populationForCity;
    
  } catch (error) {
    console.error(error);
  }
  console.log(populationData);
 
  

  
}

let apiData2="";

async function loadData1() {

  resultStatus = result = "";

    // Llamada a la API original
    const res = await fetch(API, {
      method: "GET",
    });
    try {
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      apiData2 = dataReceived;
    } catch (error) {
      console.log(`Error parseando el resultado de la API: ${error}`);
    }
  
  
  console.log("abbbbbbbb");
  const cities = [...new Set(apiData2.map((data) => data.city))];
console.log(cities);

for (const city of cities) {
  await fetchData(city);
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

  console.log(populationData);
  loadEcharts5(apiData2,populationData);
  
}


async function loadEcharts5(apiData2, populationData) {
    // Obtener el elemento HTML donde se mostrará la gráfica
    const chartElement = document.getElementById("chart5");

    console.log(populationData)

    // Crear la instancia de ECharts
    const chart = echarts.init(chartElement);

    // Obtener las ciudades y la población
    const cities = [...new Set(apiData2.map((data) => data.city))];
    console.log(cities);

    const population = cities.map((city) => populationData[city]?.data?.population || 0);
    console.log(population);


    // Configurar las opciones de la gráfica
    const options = {
      title: {
        text: "Población de ciudades",
      },
      tooltip: {},
      xAxis: {
        type: "value",
        name: "Población",
      },
      yAxis: {
        type: "category",
        data: cities,
      },
      series: [
        {
          name: "Población",
          type: "bar",
          data: population,
        },
      ],
    };

    // Mostrar la gráfica
    chart.setOption(options);
  }






  onMount(async () => {
    getData();
    getData2();
    getData3();
  loadData1();
  
    
  });
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"
  ></script>
</svelte:head>

<main>
  <div id="chart" style="width: 1300px;height:400px;" />
  <div id="chart2" style="width: 1300px;height:400px;" />
  <div id="chart5" style="width: 800px; height: 600px;" />
  <div id="chart3" style="width: 1300px;height:400px;" />
  <div id="chart4" style="width: 800px; height: 600px;" />
</main>
