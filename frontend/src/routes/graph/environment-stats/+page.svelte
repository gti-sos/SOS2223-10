<script>
    // @ts-nocheck
    import * as echarts from "echarts";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import * as highcharts from "highcharts";

    let API = "/api/v3/environment-stats";
    if (dev) API = "http://localhost:12345" + API;

    let environment_stats = [];
    let result = "";
    let resultStatus = "";

    async function loadEchart(graphData) {
        

        console.log("graphData", graphData);

        var myChart = echarts.init(document.getElementById("container"));
        myChart.setOption({
            title: {
                text: "Incendios en Andalucía",
            },
            tooltip: {},
            legend: {
                data: ["Incendios"],
            },
            xAxis: {
                data: graphData.map((item) => item.city),
                axisLabel: {
        formatter: function (value, index) {
          const item = graphData[index];
          return `${item.year} - ${item.city}`; // Mostrar año-ciudad en todas las barras
        },
            },
        },
            yAxis: {},
            series: [
                {
                    name: "Incendios",
                    type: "bar",
                    data: graphData.map((item) => item.fire),
                },
            ],
        });

        //Líneas
        var myChart2 = echarts.init(document.getElementById("container2"));
var cities = Array.from(new Set(graphData.map((item) => item.city))); // Obtener todas las ciudades únicas
var seriesData = cities.map((city) => {
  return {
    name: city,
    type: "line",
    data: graphData
      .filter((item) => item.city === city)
      .map((item) => item.fire),
  };
});

myChart2.setOption({
  title: {
    text: "Evolución de incendios por ciudad a lo largo de los años",
    top: "1%",
  },
  grid: {
    top: "20%", // Ajustar la distancia desde la parte superior
    bottom: "10%", // Ajustar la distancia desde la parte inferior
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: cities,
    top:"10%",
  },
  xAxis: {
    type: "category",
    data: Array.from(new Set(graphData.map((item) => item.year))), // Obtener todos los años únicos
  },
  yAxis: {
    type: "value",
  },
  series: seriesData,
});

const myChart3 = echarts.init(document.getElementById("container3"));

// Obtén la lista de ciudades únicas

// Define los colores para cada recurso
const colors = ["#5470c6", "#91cc75", "#fac858"];




myChart3.setOption({
    title: {
        text: "Evolución de incendios, área y espacios protegidos por ciudad y año",
    },
    tooltip: {},
    legend: {
        data: ["Incendios", "Área", "Espacios Protegidos"],
        top: "10%",
    },
    grid: {
    top: "20%", // Ajustar la distancia desde la parte superior
    bottom: "10%", // Ajustar la distancia desde la parte inferior
  },
    xAxis: {
        data: graphData.map((item) => `${item.city} - ${item.year}`),
    },
    yAxis: {
        type: "value",
    },
    dataZoom: [
        {
            type: "inside",
            start: 0,
            end: 100,
        },
        {
            type: "slider",
            show: true,
            y: "90%",
            start: 0,
            end: 100,
        },
    ],
    series: [
        {
            name: "Incendios",
            type: "bar",
            itemStyle: {
                color: colors[0],
            },
            data: graphData.map((item) => item.fire),
        },
        {
            name: "Área",
            type: "bar",
            itemStyle: {
                color: colors[1],
            },
            data: graphData.map((item) => item.area),
        },
        {
            name: "Espacios Protegidos",
            type: "bar",
            itemStyle: {
                color: colors[2],
            },
            data: graphData.map((item) => item.protected_space),
        },
    ],
    color: colors,
});

// Agrega la funcionalidad de selección de eje y
document.getElementById("selectYAxis").addEventListener("change", (event) => {
    const selectedYAxis = event.target.value;
    const seriesIndex = ["Incendios", "Área", "Espacios Protegidos"].indexOf(selectedYAxis);
    myChart3.setOption({
        yAxis: {
            type: "value",
        },
        series: [
            {
                name: selectedYAxis,
                type: "bar",
                itemStyle: {
                    color: colors[seriesIndex],
                },
                data: graphData.map((item) => item[selectedYAxis.toLowerCase().replace(" ", "_")]),
            },
        ],
    });
});






    }



      



    async function loadHighchart(graphData) {
  const chartData = graphData.reduce((acc, data) => {
    const { city, protected_space, area } = data;
    acc[city] = acc[city] || { protected_space: 0, area: 0 };
    acc[city].protected_space += protected_space;
    acc[city].area += area;
    return acc;
  }, {});

  const seriesData = Object.entries(chartData).map(([city, { protected_space, area }]) => ({
    name: city,
    y: protected_space *30 / area * 100, // Calcular el porcentaje
    extra: area,
  }));

  Highcharts.chart("containerPie", {
    chart: {
      type: "area", // Cambiar a tipo "area"
    },
    title: {
      text: "Comparación de áreas protegidas y áreas en la ciudad por ciudad",
    },
    xAxis: {
      categories: seriesData.map((data) => data.name), // Configurar las categorías en el eje x
    },
    yAxis: {
      title: {
        text: "Porcentaje", // Configurar el título del eje y
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}%</b><br/>' + // Mostrar el porcentaje con dos decimales
        "Área total: <b>{point.extra}</b>",
    },
    plotOptions: {
      area: {
        dataLabels: {
          enabled: true,
          format: "{point.y:.2f}%", // Mostrar el porcentaje en el gráfico
        },
      },
    },
    series: [
      {
        name: "Áreas protegidas",
        data: seriesData,
      },
    ],
  });
}




    async function getData() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived, null, 2);
            environment_stats = dataReceived;
            console.log("environment_stats", environment_stats);

            loadEchart(environment_stats);
            loadHighchart(environment_stats);
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    onMount(async () => {
        getData();
    });


</script>


<svelte:head>
    <script
        src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"
    ></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<main>
    <div id="containerPie" style="width: 1300px;height:400px;" />

    <div id="container" style="width: 1400px;height:400px;" />

 
    <div id="chart" />

    <div id="container2" style="width: 1300px;height:400px;" />
    <div id="container3" style="width: 1300px;height:400px;" />
</main>
