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
    const apiExterna2 = 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions';
  
    async function getDataApi1() {
      resultStatus = results = "";
      const res = await fetch(apiExterna2, {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': '1e9cbc92ffmshcd2acf78a6e6212p187ea5jsn23d868ef2151',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });
      try {
        const dataRecived = await res.json();
        results = JSON.stringify(dataRecived, null, 2);
        data = dataRecived.data;
        console.log(data);
      } catch (error) {
        console.log(`Error parsing result: ${error}`);
      }
      const status = await res.status;
      resultStatus = status;
    }
    onMount(async () => {
      getDataApi1();
    });
  </script>
  
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Wikidata ID</th>
        <th>Nombre</th>
        <th>País</th>
        <th>Código de país</th>
        <th>Región</th>
        <th>Código de región</th>
        <th>Latitud</th>
        <th>Longitud</th>
        <th>Población</th>
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

