<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Alert, Column, Button, Table } from 'sveltestrap';
        import { page } from '$app/stores';
    let search = false; // se ha buscado
        onMount(async () => {
            getEnvironment();
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
            

        let uptprovince = 'province';
        let uptperiod = 'period';
        let population_over_16_years = 'population_over_16_years';
        let activity_men_percentage = 'activity_men_percentage';
        let activity_women_percentage = 'activity_women_percentage';
       
        
        let message = "";
    
        let result = "";
        let resultStatus = "";
    
        async function getEnvironment () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                uptprovince = data.province;
                uptperiod = data.period;
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
                province: String(uptprovince),
                period: Number(uptperiod),
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
            checkMSG = "Datos empleo actualizados";
            getEnvironment();
        } else {
            msgVisible = true;
            color = "danger";
            checkMSG = "Error al actualizar los datos de empleo, comprueba que hayas completado todos los campos y que los campos numericos son mayores que 0 y vuelve a intentarlo";
        }
    } catch (error) {
        console.error(error);
        msgVisible = true;
        color = "danger";
        checkMSG = "Hubo un error al intentar actualizar los datos de empleo, intenta nuevamente más tarde";
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
          <th width="115px">province</th>
          <th>period</th>
          <th width="89px">population_over_16_years</th>
          <th width="89px">activity_men_percentage</th>
          <th>activity_women_percentage</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{uptprovince}</td>

          <td><input type="text" bind:value={uptperiod} class="form-control"></td>
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
  