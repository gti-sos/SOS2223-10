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
    let weatherData = "";

    let API_URL =
        "https://sos2223-10.ew.r.appspot.com/api/v3/environment-stats";

    /* async function loadEchart(apiData, weatherData) {
        // Crear un arreglo con las etiquetas del eje X
        const labels = apiData.map((datum) => datum.city);

        // Crear un arreglo con los valores del eje Y (protección de espacios)
        const protectedSpaces = apiData.map((datum) => datum.protected_space);

        // Crear un arreglo con los valores del eje Y (temperaturas)
        // const temperatures = weatherData.map((datum) => datum.current.temp_c);
        const temperatures = [weatherData.current.temp_c];

        // Crear una instancia de ECharts
        const chart = echarts.init(document.getElementById("chart"));

        // Configurar opciones de la gráfica
        const options = {
            title: {
                text: "Espacios protegidos vs Temperaturas",
            },
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ["Espacios protegidos", "Temperaturas"],
            },
            xAxis: {
                type: "category",
                data: labels,
            },
            yAxis: [
                {
                    type: "value",
                    name: "Espacios protegidos",
                },
                {
                    type: "value",
                    name: "Temperaturas (°C)",
                },
            ],
            series: [
                {
                    name: "Espacios protegidos",
                    type: "bar",
                    data: protectedSpaces,
                },
                {
                    name: "Temperaturas",
                    type: "line",
                    yAxisIndex: 1,
                    data: temperatures,
                },
            ],
        };

        // Usar las opciones para generar la gráfica
        chart.setOption(options);
    } */

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
        loadEchart(apiData, weatherData);
    }

    onMount(async () => {
        getData();

    });
</script>

<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"
    ></script>
</svelte:head>

<main>
    <div id="chart" style="width: 1300px;height:400px;" />
</main>
