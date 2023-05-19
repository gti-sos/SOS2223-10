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
    const apiExterna2 = 'https://local-business-data.p.rapidapi.com/search?query=Hotels%20in%20San%20Francisco%2C%20USA&limit=20&lat=37.359428&lng=-121.925337&zoom=13&language=en&region=us';

    async function getDataApi2() {
        resultStatus = results = "";
        const res = await fetch(apiExterna2, {
            method: "GET",
            headers: {
		'X-RapidAPI-Key': '6e05226348mshbac5baf127d9c4cp13df23jsnfca096197252',
		'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
	}
    
});
    try {
        const dataRecived = await res.json();
        results = JSON.stringify(dataRecived, null, 2);
        datos = dataRecived;
        datos  = datos.data.slice(0,5);
        //console.log(datos);
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

  