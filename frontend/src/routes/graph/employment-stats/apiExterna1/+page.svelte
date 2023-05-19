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

  const APIEx1 =
    "https://trading-view.p.rapidapi.com/v2/auto-complete?text=tesla&lang=en&start=0";
  const apiExterna2 =
    "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0";
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function getDataApi1() {
    resultStatus = results = "";
    const res = await fetch(APIEx1, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bf07a2acb0msh7f5e40a2ed07776p1bdb14jsndbe5bc17f154",
        "X-RapidAPI-Host": "trading-view.p.rapidapi.com",
      },
    });
    try {
      const dataRecived = await res.json();
      //console.log(dataRecived);
      results = JSON.stringify(dataRecived, null, 2);
      datosAPI1 = dataRecived.symbols.slice(10, 15);
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
        "X-RapidAPI-Key": "bf07a2acb0msh7f5e40a2ed07776p1bdb14jsndbe5bc17f154",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    });

    try {
      const dataRecived = await res.json();
      //console.log(dataRecived);
      results = JSON.stringify(dataRecived, null, 2);
      datosAPI2 = dataRecived.data.coins.slice(0, 5);
      //console.log(datosAPI2);
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
    }

    const status = await res.status;
    resultStatus = status; //Sirve para almacenar el codigo de estado de la peticion.
  }

  onMount(async () => {
    await getDataApi1();
    await getDataApi2();
  });
</script>

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
          <td>{dato1.currency_code}</td>
          <td>{dato1.type}</td>
          <td>{dato1.exchange}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:catch error}
  <p>Error fetching data from API 1: {error.message}</p>
{/await}

{#await getDataApi2()}
  <p>Fetching data from API 2...</p>
{:then}
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Posicion</th>
        <th>Precio en bitcoin</th>
      </tr>
    </thead>
    <tbody>
      {#each datosAPI2 as dato2}
        <tr>
          <td>{dato2.name}</td>
          <td>{dato2.rank}</td>
          <td>{dato2.btcPrice}</td>
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
