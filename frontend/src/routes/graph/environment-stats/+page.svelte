<script>
    // @ts-nocheck
    import * as echarts from "echarts";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";

    let API = "/api/v3/environment-stats";
    if (dev) API = "http://localhost:12345" + API;

    let environment_stats = [];
    let result = "";
    let resultStatus = "";

    async function loadEchart(graphData) {
        graphData.sort((a, b) => {
            if (b.year !== a.year) {
                // ordena primero por year de mayor a menor
                return a.year - b.year;
            } else {
                // si el year es igual, ordena por city en orden alfabético
                return a.city.localeCompare(b.city);
            }
        });

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
                data: graphData.map((item) => `${item.year} - ${item.city}`),
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

        /*      var myChart2 = echarts.init(document.getElementById('container2'));
myChart2.setOption({
  title: {
    text: 'Incendios en Andalucía'
  },
  tooltip: {},
  legend: {
    data: graphData.map(item => item.city)
  },
  xAxis: {
          data: graphData.map(item => `${item.year}`)
        },
  yAxis: {
    name: 'Número de Incendios'
  },
  series: graphData.map(item => {
    return {
      name: item.city,
      type: 'line',
      data: graphData.map(item => item.fire)
    }
  })
});  */
        //Líneas
        var myChart2 = echarts.init(document.getElementById("container2"));
        myChart2.setOption({
            title: {
                text: "Evolución de incendios por provincia y año",
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                    animation: false,
                    label: {
                        backgroundColor: "#ccc",
                        borderColor: "#aaa",
                        borderWidth: 1,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        textStyle: {
                            color: "#000",
                        },
                    },
                },
            },
            legend: {
                data: graphData.map((item) => item.city),
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: graphData
                    .filter((item, index, self) => {
                        // Filtrar duplicados en el eje x
                        return (
                            index ===
                            self.findIndex(
                                (t) =>
                                    t.year === item.year &&
                                    t.province === item.province
                            )
                        );
                    })
                    .map((item) => item.year),
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value}",
                },
                min: 0,
            },
            series: graphData.map((item) => {
                return {
                    name: item.city,
                    type: "line",
                    data: graphData
                        .filter(
                            (t) =>
                                t.city === item.city &&
                                t.province === item.province &&
                                t.year
                        )
                        .map((t) => t.fire),
                    smooth: true,
                };
            }),
        });
        const myChart3 = echarts.init(document.getElementById("container3"));

        // Define los colores para cada recurso
        const colors = ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"];

        myChart3.setOption({
            title: {
                text: "Número de incendios y área protegida por ciudad y año",
            },
            tooltip: {},
            legend: {
                data: ["Número de incendios", "Área protegida"],
            },
            xAxis: {
                data: graphData.map((item) => `${item.year} - ${item.city}`),
            },
            yAxis: {},
            series: [
                {
                    name: "Número de incendios",
                    type: "bar",
                    stack: "total",
                    itemStyle: {
                        color: colors[0],
                    },
                    data: graphData.map((item) => item.fire),
                },
                {
                    name: "Área protegida",
                    type: "bar",
                    stack: "total",
                    itemStyle: {
                        color: colors[1],
                    },
                    data: graphData.map((item) => item.area),
                },
            ],
            color: colors,
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
</svelte:head>

<main>
    <div id="container" style="width: 1300px;height:400px;" />

    <body>Hola</body>
    <div id="chart" />

    <div id="container2" style="width: 1300px;height:400px;" />
    <div id="container3" style="width: 1300px;height:400px;" />
</main>
