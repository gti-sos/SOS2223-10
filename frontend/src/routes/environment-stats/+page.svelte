<main>
    <h1>
        Bienvenido a la API environment_stats 
    </h1>
    <div style="text-align: center;">
    <h5>Desarrollada por Rushabh Patel</h5>
    </div>
</main>



<script>
    // @ts-nocheck
    
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table, ButtonToolbar } from "sveltestrap";
        onMount(async () => {
            getEnvironment();
        });
        
        let API = '/api/v2/environment-stats';
        let mensajeUsuario = "";
        
        if(dev)
            API = 'http://localhost:12345'+API
            
        let environment_stats = [];
        let newYear = 'Year';
        let newCity = 'City';
        let newProtected_space = 'protected_space';
        let newArea = 'area';
        let newFire = 'fire';
        
    
        let result = "";
        let resultStatus = "";
        async function loadData() {
            resultStatus = result = "";
            const res = await fetch(API+'/loadInitialData', {
                method: 'GET'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==201){
                getEnvironment(); 
            }	
}
    
        async function getEnvironment () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                environment_stats = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }

   
        let insertedData = [];
        async function createEnvironment (){
            resultStatus = result = "";
            const newEnvironment = {
                city: newCity,
                year: parseInt(newYear),
                protected_space: parseInt(newProtected_space),
                area: parseInt(newArea),
                fire: parseInt(newFire),
         
            };
            // Comprobar si el nuevo dato ya ha sido insertado previamente
            const existingData = insertedData.find(data => 
                data.year === newYear && data.city === newCity && data.protected_space === newProtected_space
                    && data.area === newArea && data.fire === newEnvironmentfire 
            );
            if (existingData) {
                mensajeUsuario = "Ya existe ese dato";
                return;
            }
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(
                    newEnvironment
                )     
            });
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getEnvironment();
                mensajeUsuario = "Se ha creado el nuevo dato introducido";
                insertedData.push(newEnvironment);
            } else if (status == 409) {
                mensajeUsuario = "El dato introducido ya existe";
                getEnvironment();
            } else if (status == 400) {
                mensajeUsuario = "Las propiedades introducidas no tienen un formato correcto";
                getEnvironment();
            } else {
                mensajeUsuario = "No se ha podido crear el dato introducido";
                getEnvironment();
            }
        }   
        async function deleteEnvironment(City,Year){
            resultStatus = result = "";
            const res = await fetch(API+"/"+City+"/"+Year, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEnvironment ();
                mensajeUsuario = "Recurso borrado";
            }else if(status==500){
                mensajeUsuario = "Error cliente";
            }else if(status==404){
                getEnvironment ();
                mensajeUsuario = "No se ha encontrado ese recurso";
            }
        }
        async function deleteEnvironmentAll () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getEnvironment();
                mensajeUsuario = "Se han borrado correctamente los datos";
            }else{
                mensajeUsuario = "No se han podido borrar los datos";
            }		
        }

        async function searchEnvironment() {
    resultStatus = result = "";
    const res = await fetch(`${API}/${newCity}/${newYear}`, {
      method: 'GET'
    });
    const status = await res.status;
    resultStatus = status;
    if (status == 200) {
      const data = await res.json();
      environment_stats = [data]; // Actualizar la lista con el resultado de búsqueda
      mensajeUsuario = `Resultado de búsqueda para ${newCity} en ${newYear}`;
    } else if (status == 404) {
      environment_stats = []; // Limpiar la lista si no se encuentra ningún resultado
      mensajeUsuario = `No se encontraron resultados para ${newCity} en ${newYear}`;
    } else {
      mensajeUsuario = "No se ha podido realizar la búsqueda";
    }
  }

  

    
    
    
    
        
    
    </script>
   <!-- <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos Medio Ambiente</h1>
    <h1 class="botones">
        <ButtonToolbar>
            <Button outline on:click={loadData}>Datos Iniciales</Button>
        </ButtonToolbar>
    </h1>
    {#if mensajeUsuario !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensajeUsuario}</h2>
    {/if}
    <Table striped>
        <thead>
          <tr>
            <th>Ciudad</th>
            <th>Año</th>
            <th>Espacios Protegidos</th>
            <th>Área</th>
            <th>Incendios</th>
          </tr>
        </thead>
        <tbody>
            <td><input bind:value={newCity}></td>
            <td><input bind:value={newYear}></td>
            <td><input bind:value={newProtected_space}></td>
            <td><input bind:value={newArea}></td>
            <td><input bind:value={newFire}></td>
            
            <td><Button color="success" on:click={createEnvironment}>Crear</Button></td>
           

        {#each environment_stats as Environment}
          <tr>
            <td>{Environment.city}</td>
            <td>{Environment.year}</td>
            <td>{Environment.protected_space}</td>
            <td>{Environment.area}</td>
            <td>{Environment.fire}</td>
          
            <td><Button><a href='environment-stats/{Environment.city}/{Environment.year}'>Editar</a></Button></td>
            <td><Button color="danger"on:click={deleteEnvironment(Environment.city,Environment.year)}>Borrar</Button></td>
           
          </tr>
        {/each}

        <Button color="danger" on:click={deleteEnvironmentAll}>Borrado de Datos</Button>
          
        </tbody>
    </Table> 
 -->

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos Medio Ambiente</title>
    
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
<style>
body {
    font-family: 'Roboto';
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
        th, td {
            text-align: center;
            padding: 10px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        input {
            padding: 5px;
            width: 100%;
            box-sizing: border-box;
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
    <h2>Datos Medio Ambiente</h2>
    <div class="botones">
        <div style="text-align: center;">
        <div class="button-toolbar">
            <button class="button" on:click={loadData}>Datos Iniciales</button>
        </div>
        {#if mensajeUsuario !=""}
            <div class="alert">{mensajeUsuario}</div>
        {/if}
    </div>
</div>
<form on:submit|preventDefault={searchEnvironment} class="p-3 border rounded">
    <div class="form-group">
      <label for="city" class="font-weight-bold">Ciudad:</label>
      <input type="text" class="form-control form-control-sm" id="city" bind:value={newCity} required>
    </div>
    <div class="form-group">
      <label for="year" class="font-weight-bold">Año:</label>
      <input type="number" class="form-control form-control-sm" id="year" bind:value={newYear} required>
    </div>
    <Button color="primary" type="submit" class="mt-3">Buscar</Button>
  </form>
<div>
  <button class="button" on:click={getEnvironment}>Get Environment</button>
</div>

  
  
    <table>
        <thead>
            <tr>
                <th>Ciudad</th>
                <th>Año</th>
                <th>Espacios Protegidos</th>
                <th>Área</th>
                <th>Incendios</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newCity}></td>
                <td><input bind:value={newYear}></td>
                <td><input bind:value={newProtected_space}></td>
                <td><input bind:value={newArea}></td>
                <td><input bind:value={newFire}></td>
                <td><button class="button" on:click={createEnvironment}>Crear</button></td>
            </tr>
            {#each environment_stats as Environment}
            <tr>
              <td>{Environment.city}</td>
              <td>{Environment.year}</td>
              <td>{Environment.protected_space}</td>
              <td>{Environment.area}</td>
              <td>{Environment.fire}</td>
            
              <td>
                <Button color="info" class="btn-sm">
                  <a href='environment-stats/{Environment.city}/{Environment.year}' class="text-white text-decoration-none">Editar</a>
                </Button>
              </td>
              <td>
                <Button color="danger" class="btn-sm" on:click={deleteEnvironment(Environment.city,Environment.year)}>
                  Borrar
                </Button>
              </td>
            </tr>
          {/each}
          
          <div class="mt-3">
            <Button color="danger" on:click={deleteEnvironmentAll} class="btn-sm">
              Borrado de Datos
            </Button>
          </div>
        </tbody>
    </table>
</body>
</html>
          

    
    


  {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {environment_stats.length}</strong>
        </p>
        <strong>Resultado:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}

