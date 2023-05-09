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
                text: "Fertilizantes por paises",
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

    onMount(async () => {
        loadGraph();
    });
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">Gráfico column.</p>
    </figure>
</main>
