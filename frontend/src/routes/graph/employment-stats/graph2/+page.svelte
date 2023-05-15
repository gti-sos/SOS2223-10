<script>
    // @ts-nocheck
    // # selecciona por id
    // . selecciona por clase
    import { onMount } from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    import { dev } from "$app/environment";
    import { Button, Label } from "sveltestrap";
    let API = "/api/v2/employment-stats";
    let graph = [];
    let results = "";
    let datos = [];
    let data = [];
    let trabaj = "activity_women_percentage";
    let anio = "period";
    let pruebas = 0;
    let resultStatus = "";
    onMount(async () => {
        getData2();
    });
    if (dev) API = "http://localhost:12345" + API;

    async function getData2() {
        resultStatus = results = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const dataRecived = await res.json();
            results = JSON.stringify(dataRecived, null, 2);
            datos = dataRecived;
            loadChart2(datos);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    function ordenarPorPeriodo(lista) {
        lista.sort(function (a, b) {
            return a.period - b.period;
        });
        return lista;
    }

    // Llamamos a la función pasando como argumento la matriz a ordenar
    

    async function loadChart2(datos) {
        var trabajadoras = [];
        var anyo = [];
        var datosOrdenados = ordenarPorPeriodo(datos);
        for (var i = 0; i < datosOrdenados.length; i++) {
                anyo.push(datosOrdenados[i][anio]);
                trabajadoras.push(datosOrdenados[i][anio]);
            }
        var data = {
            labels: anyo,
            series: [trabajadoras],
        };

        var options = {
            showArea: true,
        };

        new Chartist.Line("#ct-chart", data, options);
    }
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
</svelte:head>

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
        Gráfico de area sobre las mujeres trabajadoras en Andalucía a lo largo
        de los años
    </p>

    <div style="text-align:center">
        <Button color="primary" href="/">Volver a Inicio</Button>
    </div>
</main>
