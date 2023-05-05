<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    //let API = "/api/v2/data";
    let API = "/api/v2/employment-stats";



    if (dev) API = "http://localhost:12345"+API;

    let propiedadX = "period";
    let propiedadY = "population_over_16_years";
    

    let data = [];
    let results = "";
    let resultStatus = "";

    async function getData() {
        resultStatus = results = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const dataRecived = await res.json();
            results = JSON.stringify(dataRecived, null, 2);
            data = dataRecived;
            loadChart(data);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function loadChart(graphData) {
        var valoresX = [];
        var valoresY = [];
        for (var i = 0; i < graphData.length; i++) {
            valoresX.push(graphData[i][propiedadX]);
            valoresY.push(graphData[i][propiedadY]);
        }

        Highcharts.chart("container", {
            chart: {
                type: "bar",
            },
            title: {
                text: 'Gráfica de ' + propiedadX + ' vs ' + propiedadY,
                align: "left",
            },
            subtitle: {
                text:
                    "Source: <a " +
                    'href="https://en.wikipedia.org/wiki/List_of_continents_and_continental_subregions_by_population"' +
                    'target="_blank">Wikipedia.org</a>',
                align: "left",
            },
            xAxis: {
                categories: valoresX,
                title: {
                    text: propiedadX,
                },
                gridLineWidth: 1,
                lineWidth: 0,
            },
            yAxis: {
                min: 0,
                title: {
                    text: propiedadY,
                    align: "high",
                },
                labels: {
                    overflow: "justify",
                },
                gridLineWidth: 0,
            },
            tooltip: {
                valueSuffix: " millions",
            },
            plotOptions: {
                bar: {
                    borderRadius: "50%",
                    dataLabels: {
                        enabled: true,
                    },
                    groupPadding: 0.1,
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "top",
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor ||
                    "#FFFFFF",
                shadow: true,
            },
            credits: {
                enabled: false,
            },
            series: [
                {
                    name:'Datos',
                    data: valoresY
                }
            ],
        });
    }
    onMount(async () => {
        getData();
    });
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<!-- Poner siempre el html dentro de main-->
<main>
    <h1>Graph</h1>
    <figure class="highcharts-figure">
        <div id="container"/>
        <p class="highcharts-description">
            Bar chart showing horizontal columns. This chart type is often
            beneficial for smaller screens, as the user can scroll through the
            data vertically, and axis labels are easy to read.
        </p>
    </figure>
    {#if resultStatus != ""}
        <p>Result:</p>
        <pre>
    {"Código de estado: " + resultStatus}
{results}
        </pre>
    {/if}
</main>
