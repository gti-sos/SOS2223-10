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
      let city = $page.params.city;
      let year = $page.params.year;
      console.log(city);
      console.log(year);
      let API = '/api/v3/environment-stats/' + city + "/" + year;
      let msgVisible=false;
      let checkMSG="";
      let color="success";
      
      if(dev)
 
   
          API = 'http://localhost:12345'+API
          
      let uptCity = 'Ciudad';
      let uptYear = 'Año';
      let protected_space = 'Espacios Protegido';
      let area = 'Área';
      let fire = 'Incendio';
     
      
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
              uptCity = data.city;
              uptYear = data.year;
              protected_space = data.protected_space;
              area = data.area;
              fire = data.fire;
            
              
          }catch(error){
              console.log(`Error parsing result: ${error}`);
          }
          const status = await res.status;
          resultStatus = status;	
      }
    
      async function updateEnvironment () {
  resultStatus = result = "";
  try {
      const res = await fetch(API, {
          method: 'PUT',
          headers:{
              "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              city: String(uptCity),
              year: Number(uptYear),
              protected_space: Number(protected_space),
              area: Number(area),
              fire: Number(fire),
             
          })
      });
      const status = await res.status;
      resultStatus = status;
      if(status==200){
          msgVisible = true;
          color = "success";
          checkMSG = "Datos Medio Ambiente actualizados";
          getEnvironment();
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

<main>
  <h1>Bienvenido a la API</h1>
  <div style="text-align: center;">
      <h5>Desarrollada por Rushabh Patel</h5>
  </div>
</main>
<html lang="es">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Datos Medio Ambiente</title>

      <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
      />
      <style>
          body {
              font-family: "Roboto";
              font-size: 18px;
          }
          h1 {
              text-align: center;
              font-size: 40px;
              margin-top: 50px;
          }
          .botones {
              margin-bottom: 30px;
          }
         
          h2 {
              text-align: center;
              font-family: Arial, Helvetica, sans-serif;
              color: blue;
              margin-bottom: 20px;
          }
          table {
              margin: 0 auto;
              width: 80%;
              border-collapse: collapse;
              margin-bottom: 30px;
          }
          th,
          td {
              text-align: center;
              padding: 10px;
              border: 1px solid #ddd;
          }
          th {
              background-color: #f2f2f2;
              font-weight: bold;
          }

          .small-input {
              width: 100px;
          }

      
          form {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 40px;
}


          .button {
              display: inline-block;
              padding: 10px;
              border-radius: 5px;
              border: none;
              color: #fff;
              background-color: #007bff;
              text-decoration: none;
              font-size: 16px;
              margin-right: 10px;
          }
          .button:hover {
              background-color: #0069d9;
          }
          .button.delete {
              background-color: #dc3545;
          }
          .button.delete:hover {
              background-color: #c82333;
          }
          .button-toolbar {
              margin-bottom: 20px;
          }
          .alert {
              text-align: center;
              padding: 10px;
              background-color: #f8d7da;
              color: #721c24;
              margin-bottom: 20px;
              border: 1px solid #f5c6cb;
              border-radius: 5px;
          }
      </style>
  </head>


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
        <th width="200px">Ciudad</th>
        <th width="80">Año</th>
        <th width="80px">Espacios Protegido</th>
        <th width="80px">Área</th>
        <th>Incendio</th>
        
      </tr>
    </thead>
    <tbody>
      <tr>
        
        <td>{uptCity}</td>

        <td><input type="text" bind:value={uptYear} class="form-control" required></td>
        <td><input type="text" bind:value={protected_space} class="form-control" required></td>
        <td><input type="text" bind:value={area} class="form-control" required></td>
        <td><input type="text" bind:value={fire} class="form-control" required> </td>
        
        <td><Button on:click={updateEnvironment} class="bg-warning font-weight-bold">Editar</Button></td>
      </tr>
    </tbody>
  </table>

</div>
  </body>
</html>
  