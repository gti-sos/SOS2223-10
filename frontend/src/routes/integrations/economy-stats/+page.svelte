<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Label } from "sveltestrap";
  
    let API = "/api/v2/economy-stats";
  
    if (dev) API = "http://localhost:12345/" + API;
  
    let results = "";
    let data = [];
    let resultStatus = "";
    let stats = [];
    let territory = [];
    let period = [];
    let finished_house = [];
    let half_price_m_two = [];
    let tourist = [];
    let precio = []; // Array para almacenar puntuaciones
    
  
    async function getData() {
      console.log("Fetching stats....");
      const res = await fetch(API);
      if (res.ok) {
        const data = await res.json();
        stats = data;
        console.log("Estadísticas recibidas: " + stats.length);
        // Inicializamos los arrays para mostrar los datos
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
    }
  
    const apiExterna3 =
      "https://airbnb13.p.rapidapi.com/search-location?location=Paris&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD";
  
    async function getDataApi3() {
      resultStatus = results = "";
      const res = await fetch(apiExterna3, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "1e9cbc92ffmshcd2acf78a6e6212p187ea5jsn23d868ef2151",
          "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
        },
      });
      try {
        const response = await res.json();
        results = JSON.stringify(response, null, 2);
        if (Array.isArray(response.results)) {
          response.results.forEach((item3) => {
            precio.push(item3.price.total); // Agregar precio total al array
            console.log(precio);
          });
        } else {
          console.log("Error: results is not an array.");
        }
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
    }
  
    onMount(async () => {
      await getData(); // Obtener los datos de la primera API
      await getDataApi3(); // Obtener los datos de la segunda API
  
      const trace1 = {
        x: territory,
        y: half_price_m_two,
        type: "line",
        name: "precio medio metro cuadrado",
        marker: {
          color: "green",
        },
      };

      const trace2 = {
        x: territory,
        y: precio,
        type: "line",
        name: "precio",
        marker: {
          color: "blue",
        },
      };
  
      
  
      const dataPlotly1 = [trace1, trace2];
  
      const layout = {
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
        title: "Integración Territorio con latitud y longitud",
      };
  
      const plotlyScript = document.createElement("script");
      plotlyScript.src = "https://cdn.plot.ly/plotly-2.3.0.min.js";
      plotlyScript.onload = () => {
        // Crear la gráfica
        Plotly.newPlot("myDiv", dataPlotly1, layout);
      };
      document.head.appendChild(plotlyScript);
    });
  </script>

<div id="myDiv" />
<!--
<h1>API GEO-DB</h1>
<table>
    <thead>
        <tr>
            <th style="text-decoration: underline;">ID</th>
            <th style="text-decoration: underline;">Wikidata ID</th>
            <th style="text-decoration: underline;">Nombre</th>
            <th style="text-decoration: underline;">País</th>
            <th style="text-decoration: underline;">Código de país</th>
            <th style="text-decoration: underline;">Región</th>
            <th style="text-decoration: underline;">Código de región</th>
            <th style="text-decoration: underline;">Latitud</th>
            <th style="text-decoration: underline;">Longitud</th>
            <th style="text-decoration: underline;">Poblacion</th>
        </tr>
    </thead>
    <tbody>
        {#each data as item}
            <tr>
                <td>{item.id}</td>
                <td>{item.wikiDataId}</td>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>{item.countryCode}</td>
                <td>{item.region}</td>
                <td>{item.regionCode}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td>{item.population}</td>
            </tr>
        {/each}
    </tbody>
</table>
<h1>API MS-FINANCE</h1>
{#if Array.isArray(data2) && data2.length > 0}
    <table>
        <thead>
            <tr>
                <th style="text-decoration: underline;">ID</th>
                <th style="text-decoration: underline;">Nombre</th>
                <th style="text-decoration: underline;">Descripcion</th>
                <th style="text-decoration: underline;">Intercambio</th>
                <th style="text-decoration: underline;">Id de rendimiento</th>
                <th style="text-decoration: underline;">Tipo Seguridad</th>
                <th style="text-decoration: underline;">Ticker</th>
                <th style="text-decoration: underline;">Tipo</th>
                <th style="text-decoration: underline;">URL</th>
            </tr>
        </thead>
        <tbody>
            {#each data2 as item2}
                <tr>
                    <td>{item2.id}</td>
                    <td>{item2.name}</td>
                    <td>{item2.description}</td>
                    <td>{item2.exchange}</td>
                    <td>{item2.performanceId}</td>
                    <td>{item2.securityType}</td>
                    <td>{item2.ticker}</td>
                    <td>{item2.type}</td>
                    <td>{item2.url}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else if !Array.isArray(data)}
    <p>Error: results no es un array.</p>
{:else}
    <p>Error: No se encontraron datos.</p>
{/if}

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }
</style>
-->
