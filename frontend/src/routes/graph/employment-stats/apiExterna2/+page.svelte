<script>
  //@ts-nocheck
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { Button, Label } from "sveltestrap";

  //let API = "/api/v2/data";
  let API = "/api/v2/employment-stats";

  if (dev) API = "http://localhost:12345" + API;

  let datosTotal = [];
  let results = "";
  let datos = [];
  let resultStatus = "";
  const apiExterna2 =
  'https://idealista2.p.rapidapi.com/properties/list?locationId=0-EU-IT-RM-01-001-097-09-003&locationName=Caffarella%2C%20Roma&operation=rent&numPage=1&maxItems=40&sort=asc&locale=en&country=it';


  async function getDataApi2() {
    resultStatus = results = "";
    const res = await fetch(apiExterna2, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '1e9cbc92ffmshcd2acf78a6e6212p187ea5jsn23d868ef2151',
        'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
    }
    });
    try {
      const dataRecived = await res.json();
      console.log(dataRecived);
      results = JSON.stringify(dataRecived, null, 2);
      datos = dataRecived;
      datos = datos.data.slice(0, 5);
      console.log(datos);
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
  }
  onMount(async () => {
    datosTotal = getDataApi2();
  });
</script>

<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Valoracion</th>
      <th>Numero de telefono</th>
    </tr>
  </thead>
  <tbody>
    {#each datos as dato}
      <tr>
        <td>{dato.name}</td>
        <td>{dato.rating}</td>
        <td>{dato.phone_number}</td>
      </tr>
    {/each}
  </tbody>
</table>

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
