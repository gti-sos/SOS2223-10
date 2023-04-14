<script>
  // @ts-nocheck
  
      import { onMount } from 'svelte';
      import { dev } from '$app/environment';
      import { Alert, Column, Button, Table } from 'sveltestrap';
      import { page } from '$app/stores';
  let search = false; // se ha buscado
      onMount(async () => {
        getEmployment();
      });
      let province = $page.params.province;
      let period = $page.params.period;
      console.log(province);
      console.log(period);
      let API = '/api/v2/environment-stats/' + province + "/" + period;
      let msgVisible=false;
      let checkMSG="";
      let color="success";
      
      if(dev)
 
   
          API = 'http://localhost:12345'+API
          
      let uptProvince = 'Provincia';
      let uptPeriod = 'Periodo';
      let population_over_16_years = 'Poblacion Mayor de edad';
      let activity_men_percentage = 'Porcentaje de actividad en hombres';
      let activity_women_percentage = 'Porcentaje de actividad en mujeres';
     
      
      let message = "";
      let result = "";
      let resultStatus = "";
  
      async function getEmployment () {
          resultStatus = result = "";
          const res = await fetch(API, {
              method: 'GET'
          });
          try{
              const data = await res.json();
              result = JSON.stringify(data,null,2);
              uptProvince = data.province;
              uptPeriod = data.period;
              population_over_16_years = data.population_over_16_years;
              activity_men_percentage = data.activity_men_percentage;
              activity_women_percentage = data.activity_women_percentage;
            
              
          }catch(error){
              console.log(`Error parsing result: ${error}`);
          }
          const status = await res.status;
          resultStatus = status;	
      }
    
      async function updateEmployment () {
  resultStatus = result = "";
  try {
      const res = await fetch(API, {
          method: 'PUT',
          headers:{
              "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              province: String(uptCity),
              period: Number(uptYear),
              population_over_16_years: Number(population_over_16_years),
              activity_men_percentage: Number(activity_men_percentage),
              activity_women_percentage: Number(activity_women_percentage),
             
          })
      });
      const status = await res.status;
      resultStatus = status;
      if(status==200){
          msgVisible = true;
          color = "success";
          checkMSG = "Datos Medio Ambiente actualizados";
          getEmployment();
      } else {
          msgVisible = true;
          color = "danger";
          checkMSG = "Error al actualizar los datos de medio ambiente, comprueba que hayas completado todos los campos y que los campos numericos son mayores que 0 y vuelve a intentarlo";
      }
  } catch (error) {
      console.error(error);
      msgVisible = true;
      color = "danger";
      checkMSG = "Hubo un error al intentar actualizar los datos de medio ambiente, intenta nuevamente más tarde";
  }
}
      
  
  </script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, sans-serif;
  font-size: 14px;
  text-align: left;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

body {
margin: 0 20px; /* Cambia el valor de 20px según tus necesidades */
}
.page-container {
      margin: 0 50px; /* aplicar margen de 50px en los laterales */
    }
    h1 {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: normal;
    } 

</style>


  <body>
    <div class="page-container">
  <h1>Dato ciudad y Año en concreto</h1>
  
  <Alert color={color} isOpen={msgVisible} toggle={() => (msgVisible = false)}>
    {#if checkMSG!=""}
      {checkMSG}
    {/if}
  </Alert>
    
  <table class="table table-bordered table-striped table-hover">
    <thead>
      <tr>
        <th width="115px">Provincia</th>
        <th>Periodo</th>
        <th width="89px">Poblacion mayor de edad</th>
        <th width="89px">Porcentaje de actividad en hombres</th>
        <th>Porcentaje de actividad en mujeres</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        
        <td>{uptProvince}</td>
        <td><input type="text" bind:value={uptPeriod} class="form-control"></td>
        <td><input type="text" bind:value={population_over_16_years} class="form-control"></td>
        <td><input type="text" bind:value={activity_men_percentage} class="form-control"></td>
        <td><input type="text" bind:value={activity_women_percentage} class="form-control"></td>
        
        <td><Button on:click={updateEmployment} class="bg-warning font-weight-bold">Editar</Button></td>
      </tr>
    </tbody>
  </table>
  
    
    

    {#if message != ""}
      <h1 style="color :red">{message}</h1>
  {/if}

    
  {#if resultStatus != ""}
      <p>
          Result:
      </p>
      <pre>
{resultStatus}
{result}
      </pre>
  {/if}
</div>
  </body>
  
  