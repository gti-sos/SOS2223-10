<script>
  //@ts-nocheck
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { Button, Label } from "sveltestrap";
  //let API = "/api/v2/data";
  let API = "/api/v2/employment-stats";

  if (dev) API = "http://localhost:12345" + API;

  let results = "";
  let datosAPI1 = "";
  let datosAPI2 = "";
  let resultStatus = "";

  const APIEx1 = "https://sportscore1.p.rapidapi.com/sports/1/teams?page=1";
  const apiExterna2 =
    "https://idealista2.p.rapidapi.com/properties/list?locationId=0-EU-IT-RM-01-001-097-09-003&locationName=Caffarella%2C%20Roma&operation=rent&numPage=1&maxItems=40&sort=asc&locale=en&country=it";
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function getDataApi1() {
    resultStatus = results = "";
    const res = await fetch(APIEx1, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1fcd22e2d6mshe65a5ffe5c21c81p11a806jsn6259cc22b460",
        "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      },
    });
    try {
      const dataRecived = await res.json();
      results = JSON.stringify(dataRecived, null, 2);
      //console.log("Results API1", results);
      datosAPI1 = dataRecived.data.slice(0, 10);
      //console.log("Estos son los datos de la API1",datosAPI1);
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
  }
  async function getDataApi2() {
    resultStatus = results = "";
    const res = await fetch(apiExterna2, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "6e05226348mshbac5baf127d9c4cp13df23jsnfca096197252",
        "X-RapidAPI-Host": "idealista2.p.rapidapi.com",
      },
    });

    try {
      const dataRecived = await res.json();
      //console.log(dataRecived);
      results = JSON.stringify(dataRecived, null, 2);
      datosAPI2 = dataRecived.elementList.slice(0, 5);
      //console.log(datosAPI2);
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }

    const status = await res.status;
    resultStatus = status; //Sirve para almacenar el codigo de estado de la peticion.
  }

  onMount(async () => {
    //await getDataApi1();
    //await getDataApi2();
  });
</script>
<h2>
  Datos de equipos ingleses
</h2>
  {#await getDataApi1()}
  <p>Fetching data from API 1...</p>
{:then}
  <table>
    <thead>
      <tr>
        <th>Codigo de la moneda</th>
        <th>Tipo</th>
        <th>Exchange</th>
      </tr>
    </thead>
    <tbody>
      {#each datosAPI1 as dato1}
        <tr>
          <td>{dato1.name}</td>
          <td>{dato1.id}</td>
          <td>{dato1.category_id}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:catch error}
  <p>Error fetching data from API 1: {error.message}</p>
{/await}
<p></p>
<p></p>
<h2>Datos de Idealista</h2>
<p></p>
{#await getDataApi2()}
  <p>Fetching data from API 2...</p>
{:then}
  <table>
    <thead>
      <tr>
        <th>Ciudad</th>
        <th>Barrio</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      {#each datosAPI2 as dato2}
        <tr>
          <td>{dato2.municipality}</td>
          <td>{dato2.neighborhood}</td>
          <td>{dato2.price}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:catch error}
  <p>Error fetching data from API 2: {error.message}</p>
{/await}

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #ffffff;
    color: #333333;
    font-family: Arial, sans-serif;
  }

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #cccccc;
  }

  th {
    background-color: #ff6f00;
    color: #ffffff;
  }

  tr:nth-child(even) {
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #d8eaff;
  }
</style>
