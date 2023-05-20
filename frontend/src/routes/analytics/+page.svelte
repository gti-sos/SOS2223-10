<script>
// @ts-nocheck

import * as echarts from "echarts";
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import axios from "axios";

  let API1 = "/api/v3/environment-stats";
  let API2 = "/api/v2/economy-stats";
  let API3 = "/api/v2/employment-stats";


  let API_URL1 = "https://sos2223-10.ew.r.appspot.com/api/v3/environment-stats";
  let API_URL2 = "https://sos2223-10.ew.r.appspot.com/api/v2/economy-stats";
  let API_URL3 = "https://sos2223-10.ew.r.appspot.com/api/v2/employment-stats";

  if (dev) API1 = "http://localhost:12345" + API1;
  if (dev) API2 = "http://localhost:12345" + API2;
  if (dev) API3 = "http://localhost:12345" + API3;




  let result = "";
  let resultStatus = "";
  let apiData1 = "";
  let apiData2 = "";
  let apiData3 = "";

  async function loadEchart2(apiData1, apiData2, apiData3) {
 
  const andaluciaCities = ["Almería", "Cádiz", "Córdoba", "Granada", "Huelva", "Jaén", "Málaga", "Sevilla"];
  const andaluciaCities2 = ["almeria", "cadiz", "cordoba", "granada", "huelva", "jaen", "malaga", "sevilla"];

  
  const filteredData1 = apiData1.filter((data) => andaluciaCities.includes(data.city));
  const filteredData2 = apiData2.filter((data) => andaluciaCities.includes(data.territory));
 
  const filteredData3 = apiData3.filter((data) => andaluciaCities2.includes(data.province));

  const areaData = filteredData1.map((data) => data.area);

  const finishedHousesData = filteredData2.map((data) => data.finished_house);

  
  const populationOver16Data = filteredData3.map((data) => data.population_over_16_years);

 
  const chartElement = document.getElementById("chart2");

  
  const chart = echarts.init(chartElement);

  const options = {
    title: {
      text: "Datos de Área, Casas terminadas y Población mayor de 16 años en ciudades de Andalucía",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Área", "Casas terminadas", "Población mayor de 16 años"],
    },
    xAxis: {
      data: andaluciaCities,
    },
    yAxis: [
      {
        name: "Área (km²)",
        type: "value",
      },
      {
        name: "Casas terminadas",
        type: "value",
      },
      {
        name: "Población mayor de 16 años",
        type: "value",
      },
    ],
    series: [
      {
        name: "Área",
        type: "bar",
        data: areaData,
      },
      {
        name: "Casas terminadas",
        type: "bar",
        yAxisIndex: 1,
        data: finishedHousesData,
      },
      {
        name: "Población mayor de 16 años",
        type: "bar",
        yAxisIndex: 2,
        data: populationOver16Data,
      },
    ],
  };

  // Establecer las opciones en la gráfica
  chart.setOption(options);
}





  async function getData() {
    resultStatus = result = "";

    // Llamada a la API original
    const res = await fetch(API1, {
      method: "GET",
    });
    try {
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      apiData1 = dataReceived;
      console.log(apiData1);
    } catch (error) {
      console.log(`Error parseando el resultado de la API: ${error}`);
    }
  }

  async function getData2() {
    resultStatus = result = "";

    // Llamada a la API original
    const res = await fetch(API2, {
      method: "GET",
    });
    try {
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      apiData2 = dataReceived;
      console.log(apiData2);
    } catch (error) {
      console.log(`Error parseando el resultado de la API: ${error}`);
    }
  }
  async function getData3() {
    resultStatus = result = "";

    // Llamada a la API original
    const res = await fetch(API3, {
      method: "GET",
    });
    try {
      const dataReceived = await res.json();
      result = JSON.stringify(dataReceived, null, 2);
      apiData3 = dataReceived;
      console.log(apiData3);
    } catch (error) {
      console.log(`Error parseando el resultado de la API: ${error}`);
    }
    loadEchart2(apiData1,apiData2,apiData3);
  }

  







  onMount(async () => {
    getData();
    getData2();
    getData3();
  });


</script>


<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"
  ></script>
</svelte:head>


<main>
    <div id="chart2" style="width: 100%; height: 400px; margin-top: 20px;"></div>
  </main>
  