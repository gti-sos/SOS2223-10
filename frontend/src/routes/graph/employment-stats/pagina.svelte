<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Label } from "sveltestrap";
    let API = "/api/v2/employment-stats";
  
    if (dev) API = "http://localhost:12345" + API;
  /*
    let results = "";
    let datosAPI1 = "";
    let datosAPI2 = "";
    let resultStatus = "";
  
    const APIIntegracion1 =
    'https://local-business-data.p.rapidapi.com/search?query=Hotels%20in%20San%20Francisco%2C%20USA&limit=20&lat=37.359428&lng=-121.925337&zoom=13&language=en&region=us';    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    async function getDataApi3() {
    resultStatus = results = "";
    const res = await fetch(APIIntegracion1, {
      method: "GET",
      headers: {
		'X-RapidAPI-Key': '285e4f5ea6msheff84a200cc8afep1645eejsn917e8b5bc539',
		'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
	}
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
     // await getDataApi3();

    });
   */ 
  </script>
  <!--
  {#await getDataApi3()}
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
        {#each datosAPI2 as dato1}
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
-->