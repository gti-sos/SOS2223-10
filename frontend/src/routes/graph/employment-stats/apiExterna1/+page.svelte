<script>
  //@ts-nocheck
  import { onMount } from "svelte";
  import { dev } from "$app/environment";
  import { Button, Label } from "sveltestrap";
  //let API = "/api/v2/data";
  let API = "/api/v2/employment-stats";

  if (dev) API = "http://localhost:12345" + API;

  let results = "";
  let datosAPI1 = [];
  let datosAPI2 = [];
  let resultStatus = "";
  const APIEx1 =
    "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5";
  const apiExterna2 =
    "https://local-business-data.p.rapidapi.com/search?query=Hotels%20in%20San%20Francisco%2C%20USA&limit=20&lat=37.359428&lng=-121.925337&zoom=13&language=en&region=us";

  async function getDataApi1() {
    resultStatus = results = "";
    const res = await fetch(APIEx1, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bf07a2acb0msh7f5e40a2ed07776p1bdb14jsndbe5bc17f154",
        "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
      },
    });
    try {
      const dataRecived = await res.json();
      results = JSON.stringify(dataRecived, null, 2);
      datosAPI1 = dataRecived;
      datosAPI1 = datosAPI1.data.slice(0, 5);
      console.log(datosAPI1);
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
        "X-RapidAPI-Host": "local-business-data.p.rapidapi.com",
      },
    });
    try {
      const dataRecived = await res.json();
      results = JSON.stringify(dataRecived, null, 2);
      datosAPI2 = dataRecived;
      datosAPI2 = datosAPI2.data.slice(0, 5);
      //console.log(datos);
      console.log(datosAPI2);
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }
    const status = await res.status;
    resultStatus = status;
  }
  onMount(async () => {
    getDataApi1();
    getDataApi2();
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
    {#each datosAPI1 as dato1}
      <tr>
        <td>{dato1.name}</td>
        <td>{dato1.rating}</td>
        <td>{dato1.phone_number}</td>
      </tr>
    {/each}
  </tbody>
</table>
<table>
  <thead>
    <tr>
      <th>Temperatura</th>
      <th>Ozono</th>
      <th>Fecha</th>
    </tr>
  </thead>
  <tbody>
    {#each datosAPI2 as dato2}
      <tr>
        <td>{dato2.app_temp}</td>
        <td>{dato2.ozone}</td>
        <td>{dato2.datetime}</td>
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
