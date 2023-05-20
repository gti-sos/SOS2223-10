<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Label } from "sveltestrap";
    let API = "/api/v2/employment-stats";

    if (dev) API = "http://localhost:12345" + API;

    let results = "";
    let datosAPI1 = "";
    let myStats = [];
    let statsC = [];
    let datosMyAPI = "";
    let datosAPI2 = "";
    let resultStatus = "";
    let stats = "";
    let stats1 = "";
    let period = "";
    let jobs_industry = [];
    let population_over_16_years = "population_over_16_years";

    const APIIntegracion1 =
        "https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats/loadInitialData";
    const myData = "https://sos2223-10.appspot.com/api/v1/employment-stats";
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    async function getDataApi3() {
        resultStatus = results = "";
        const res = await fetch(APIIntegracion1, {
            method: "GET",
        });
        try {
            const dataRecived = await res.json();
            console.log(dataRecived);
            results = JSON.stringify(dataRecived, null, 2);
            //datosAPI2 = dataRecived.elementList.slice(0, 5);
            datosAPI2 = dataRecived;
            //console.log(datosAPI2);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }

        const status = await res.status;
        resultStatus = status; //Sirve para almacenar el codigo de estado de la peticion.
    }
*/
    /*
    async function getMyData() {
        resultStatus = results = "";
        const res = await fetch(myData, {
            method: "GET",
        });

        try {
            const dataRecived = await res.json();
            results = JSON.stringify(dataRecived, null, 2);
            //datosAPI2 = dataRecived.elementList.slice(0, 5);
            datosMyAPI = dataRecived;
            loadChart(datosMyAPI)
            console.log(datosMyAPI);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }

        const status = await res.status;
        resultStatus = status; //Sirve para almacenar el codigo de estado de la peticion.
    }
    */
    async function getData() {
        console.log("Fetching stats....");
        const res = await fetch(
            "https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats/loadInitialData"
        );
        const res1 = await fetch(
            "https://sos2223-10.appspot.com/api/v1/employment-stats"
        );
        if (res.ok && res1.ok) {
            const data = await res.json();
            console.log(data)
            const data1 = await res1.json();
            statsC = data;
            console.log("Estadísticas recibidas: " + statsC.length);
            //inicializamos los arrays para mostrar los datos
            myStats = data1;
            console.log("Estadísticas recibidas: " + myStats.length);
            //inicializamos los arrays para mostrar los datos
        } else {
            console.log("Error cargando los datos");
        }
        loadChart(statsC, myStats);
        console.log("Comprobando");
    }

    async function loadChart(datosC, datosM) {
        var auxiliarPeriodo = [];
        var auxiliarPopulation = [];
        var auxiliarJobs = [];
        for (var i = 0; i < datosM.length; i++) {
            console.log("Se inserta", datosM[i].period);
            auxiliarPeriodo.push(datosM[i].period);
            auxiliarPopulation.push(datosM[i].population_over_16_years);
        }
        console.log(datosC);
        console.log(auxiliarPeriodo);
        for (var i = 0; i < datosC.length; i++) {
            auxiliarJobs.push(datosC[i].jobs_industry);
        }
        var data = {
            labels: auxiliarPeriodo,
            series: [auxiliarPopulation, auxiliarJobs],
        };

        var options = {
            seriesBarDistance: 15,
            plugins: [
                Chartist.plugins.tooltip({
                    transformTooltipTextFnc: function (value) {
                        return value.toString();
                    },
                }),
            ],
        };

        new Chartist.Bar("#barras-chart", data, options);
    }

    onMount(async () => {
        await getData();
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
        Integracion
    </h2>
    <div id="barras-chart" />
    <style>
    h2 {
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
      fontSize: 40,     
    }
    </style>
    <div id="ct-chart" style="text-align: center;">
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
        Grafico de barras sobre la poblacion
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
