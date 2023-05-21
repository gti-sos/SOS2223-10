<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Label } from "sveltestrap";
    //let API = "/api/v2/data";
    let API = "/api/v2/employment-stats";

    if (dev) API = "http://localhost:12345" + API;

    //let propiedadX = "period";
    let propiedadY = "activity_men_percentage";
    let graph = [];
    let results = "";
    let datos = [];
    let data = [];
    let trabaj = "activity_women_percentage";
    let anio = "period";
    let pruebas = 0;
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
            loadChart2(data);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }

    async function loadChart(graphData) {
        //var valoresX = [];
        var workers = [];
        var unemployed = [];

        for (var i = 0; i < graphData.length; i++) {
            if (
                graphData[i].province == "almeria" &&
                graphData[i].period == 2011
            ) {
                //valoresX.push(graphData[i][propiedadX]);
                workers.push(graphData[i][propiedadY]);
                unemployed = 100 - workers;
                workers = parseFloat(workers);
            }
        }

        Highcharts.chart("container", {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
            },
            title: {
                text: "<br>Porcentaje<br>desempleo<br>en hombres<br>Almería<br>2011",
                align: "center",
                verticalAlign: "middle",
                y: 60,
            },
            tooltip: {
                pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
            },
            accessibility: {
                point: {
                    valueSuffix: "%",
                },
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: "bold",
                            color: "white",
                        },
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ["50%", "75%"],
                    size: "110%",
                },
            },
            series: [
                {
                    type: "pie",
                    name: "Porcentaje de desempleo en hombres de Almería 2011",
                    innerSize: "50%",
                    data: [
                        ["Empleados", workers],
                        ["Desempleados", unemployed],
                    ],
                },
            ],
        });
    }
    function ordenarPorPeriodo(lista) {
        lista.sort(function (a, b) {
            return a.period - b.period;
        });
        return lista;
    }
    async function loadChart2(datos) {
        var trabajadoras = [];
        var anyo = [];
        var datosOrdenados = ordenarPorPeriodo(datos);
        for (var i = 0; i < datosOrdenados.length; i++) {
            anyo.push(datosOrdenados[i][anio]);
            trabajadoras.push(datosOrdenados[i][trabaj]);
        }
        console.log(trabajadoras);
        console.log(anyo);

        var chart = new Chartist.Line(
            "#womenGraph",
            {
                labels: anyo,
                series: [trabajadoras]
            },
            {
                axisY: {
                    onlyInteger: true,
                    labelInterpolationFnc: function (value) {
                        return value;
                    },
                    axisTitle: "Poblacion mayor de edad", // Título del eje Y
                },
                axisX: {
                    onlyInteger: true,
                    labelInterpolationFnc: function (value) {
                        return "Año " + value;
                    },
                    axisTitle: "Año", // Título del eje X
                },
                chartPadding: {
                    top: 40,
                    right: 20,
                    bottom: 30,
                    left: 50,
                },
                height: "400px",
                width: "800px",
                plugins: [
                    //Chartist.plugins.tooltip({appendToBody:true),
                    Chartist.plugins.legend({
                        legendNames: [
                            "Trabajadores de industrias",
                            "Personas mayores de edad en Andalucía",
                        ],
                    }),
                    Chartist.plugins.ctAxisTitle({
                        axisX: {
                            axisTitle: "Año",
                            axisClass: "ct-axis-title2",
                            offset: {
                                x: 0,
                                y: 50,
                            },
                            textAnchor: "middle",
                        },
                        axisY: {
                            axisTitle: "Poblacion",
                            axisClass: "ct-axis-title",
                            offset: {
                                x: 0,
                                y: 0,
                            },
                            textAnchor: "start",
                        },
                    }),
                ],
            }
        );
    }

    onMount(async () => {
        getData();
    });
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
    />
    <script
        src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
    ></script>

    <script
        src="https://cdn.jsdelivr.net/npm/chartist-plugin-legend@0.6.2/chartist-plugin-legend.min.js"
    ></script>
    <script
        src="https://cdn.jsdelivr.net/npm/chartist-plugin-axistitle@0.0.7/dist/chartist-plugin-axistitle.min.js"
    ></script>
    <script
        src="https://cdn.jsdelivr.net/npm/@kblo55/chartist-plugin-tooltips@0.0.18/dist/chartist-plugin-tooltip.min.js"
    ></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
<!-- Poner siempre el html dentro de main-->
<main>
    <h2 style="text-align: center;">
        Porcentaje de mujeres trabajadoras en Andalucía
    </h2>
    <style>
    h2 {
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
      fontSize: 40,     
    }
    </style>
    <div id="womenGraph" style="text-align: center;">
        <style>
      .ct-legend {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ul {
        list-style: none; /* para quitar los puntos de la lista */
        padding: 0;
        margin: 50px;
      }
      ul li{
        margin: 10px;
      }
      .ct-series-0{
        color:  #dc3545;
      }
      .ct-series-1{
        color: #0d6efd;
      }
      .ct-series-2{
        color: #ffc107;
      }
      .ct-series-b .ct-line {
        stroke: #0d6efd;
      }
      .ct-series-b .ct-point{
        stroke: #0d6efd;
      }
      
      .ct-legend {
        position: center;
        z-index: 10;
        
      }
      .ct-legend li {
        margin: 5px,
        position: center,
        
      }
      .ct-legend li:before {
        width: 12px;
        height: 12px;
        position: absolute;
        
        
        border: 3px solid transparent;
        border-radius: 2px;
      }
      .ct-legend li.inactive:before {
        background: transparent;
      }
      .ct-legend.ct-legend-inside {
        position: center;
        top: 0;
        right: 0;
      }
      @for $i from 0 to length($ct-series-colors) {
        .ct-series-#{$i}:before {
          background-color: nth($ct-series-colors, $i + 1);
          border-color: nth($ct-series-colors, $i + 1);
        }
      }
        </style>
    </div>

    <p class="highcharts-description" style="text-align:center">
        Gráfico de area sobre las mujeres trabajadoras en Andalucía a lo largo
        de los años
    </p>

    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
    <h1>Grafico</h1>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description" />
    </figure>
</main>

<style>
    .highcharts-figure {
        min-width: 320px;
        max-width: 500px;
        margin: 1em auto;
    }

    #container {
        height: 400px;
    }
</style>
