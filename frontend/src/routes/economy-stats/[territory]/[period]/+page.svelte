<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Alert, Column, Button, Table } from 'sveltestrap';
        import { page } from '$app/stores';
    let search = false; // se ha buscado
        onMount(async () => {
            getEconomy();
        });
        let territory = $page.params.territory;
        let period = $page.params.period;
        console.log(territory);
        console.log(period);
        let API = '/api/v2/economy-stats/' + territory + "/" + period;
        let msgVisible=false;
        let checkMSG="";
        let color="success";
        
        if(dev)

   
     
            API = 'http://localhost:12345'+API
            

        let uptTerritory = 'territory';
        let uptPeriod = 'period';
        let finished_house = 'Protected Space';
        let half_price_m_two = 'half_price_m_two';
        let tourist = 'tourist';
       
        
        let message = "";
    
        let result = "";
        let resultStatus = "";
    
        async function getEconomy () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                uptTerritory = data.territory;
                uptPeriod = data.period;
                finished_house = data.finished_house;
                half_price_m_two = data.half_price_m_two;
                tourist = data.tourist;
              
                
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      
        async function updateEconomy () {
    resultStatus = result = "";
    try {
        const res = await fetch(API, {
            method: 'PUT',
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                territory: String(uptTerritory),
                period: Number(uptPeriod),
                finished_house: Number(finished_house),
                half_price_m_two: Number(half_price_m_two),
                tourist: Number(tourist),
               
            })
        });
        const status = await res.status;
        resultStatus = status;
        if(status==200){
            msgVisible = true;
            color = "success";
            checkMSG = "Datos Economia actualizados";
            getEconomy();
        } else {
            msgVisible = true;
            color = "danger";
            checkMSG = "Error al actualizar los datos de economia, comprueba que hayas completado todos los campos y que los campos numericos son mayores que 0 y vuelve a intentarlo";
        }
    } catch (error) {
        console.error(error);
        msgVisible = true;
        color = "danger";
        checkMSG = "Hubo un error al intentar actualizar los datos de economia, intenta nuevamente más tarde";
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
          <th width="115px">territory</th>
          <th>period</th>
          <th width="89px">finished_house</th>
          <th width="89px">half_price_m_two</th>
          <th>tourist</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <td>{uptTerritory}</td>

          <td><input type="text" bind:value={uptPeriod} class="form-control"></td>
          <td><input type="text" bind:value={finished_house} class="form-control"></td>
          <td><input type="text" bind:value={half_price_m_two} class="form-control"></td>
          <td><input type="text" bind:value={tourist} class="form-control"></td>
          
          <td><Button on:click={updateEconomy} class="bg-warning font-weight-bold">Editar</Button></td>
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