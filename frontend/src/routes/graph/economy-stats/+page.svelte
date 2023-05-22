<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { Table, Button } from "sveltestrap";
    import { dev } from "$app/environment";
    let apiData = {};

    let API = "/api/v2/economy-stats";
    if (dev) API = "http://localhost:12345" + API;

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let stats = [];
    let territory = [];
    let period = [];
    let finished_house = [];
    let half_price_m_two = [];
    let tourist = [];

    async function loadGraph() {
        console.log("Fetching stats....");
        const res = await fetch(API);
        if (res.ok) {
            const data = await res.json();
            stats = data;
            console.log("Estadísticas recibidas: " + stats.length);
            //inicializamos los arrays para mostrar los datos
            stats.forEach((stat) => {
                territory.push(stat.territory + "-" + stat.period);
                period.push(stat.period);
                finished_house.push(stat.finished_house);
                half_price_m_two.push(stat.half_price_m_two);
                tourist.push(stat.tourist);
            });
        } else {
            console.log("Error cargando los datos");
        }
        console.log("Comprobando");
        Highcharts.chart("container", {
            chart: {
                type: "column",
                inverted: true,
            },
            title: {
                text: "Gráfica  Highchart",
            },

            xAxis: {
                title: {
                    text: "Territorio-Periodo",
                },
                categories: territory,
            },
            yAxis: {
                title: {
                    text: "turistas",
                },
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br/>",
                pointFormat: "{point.y}turistas",
            },
            plotOptions: {
                spline: {
                    marker: {
                        enable: false,
                    },
                },
            },
            series: [
                {
                    name: "Número de casas finalizadas",
                    data: finished_house,
                },
                { name: "Precio medio metro cuadrado", data: half_price_m_two },
                { name: "turistas", data: tourist },
            ],
        });
    }

    var trace1 = {
        x: territory,
        y: finished_house,
        type: "line",
        name: "finished_house",
        marker: {
            color: "blue",
        },
    };

    var trace2 = {
        x: territory,
        y: half_price_m_two,
        type: "line",
        name: "half_price_m_two",
        marker: {
            color: "red",
        },
    };

    var trace3 = {
        x: territory,
        y: tourist,
        type: "line",
        name: "tourist",
        marker: {
            color: "green",
        },
    };

    var data = [trace1, trace2, trace3];

    var layout = {
        xaxis: {
            type: "category",
            title: "Territorios",
        },
        yaxis: {
            title: "Valores",
        },
        margin: {
            t: 50,
            b: 50,
            l: 50,
            r: 50,
        },
        title: "Gráfica Ploty",
    };

    onMount(async () => {
        await loadGraph(); //Highchart

        const plotlyScript = document.createElement("script");
        plotlyScript.src = "https://cdn.plot.ly/plotly-2.3.0.min.js";
        plotlyScript.onload = () => {
            // Crear la gráfica
            Plotly.newPlot("myDiv", data, layout);
        };
        document.head.appendChild(plotlyScript);
    });
</script>
<div id="myDiv" />

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<div id="myDiv" />

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">Gráfico column.</p>
    </figure>
</main>
