<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        onMount(async () =>{
            getEconomy();
        });
        let API = "/api/v2/economy-stats";
        let mensaje = "";
        if(dev)
            API = "http://localhost:12345"+API
            
        let economy_stats = [];
        let newTerritory = "territory";
        let newPeriod = "period";
        let newFinished_house = "finished_house";
        let newHalf_price_m_two = "half_price_m_two";
        let newTourist = "tourist";
        let result = "";
        let resultStatus = "";
        async function getEconomy(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                economy_stats = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        let insertedData = [];
        async function createEconomy(){
            resultStatus = result = "";
            const newFile = {
                territory: newTerritory,
                period: parseInt(newPeriod),
                finished_house: parseInt(newFinished_house),
                half_price_m_two: parseInt(newHalf_price_m_two),
                tourist: parseInt(newTourist)
            };
    
            
            const existingData = insertedData.find(data => 
                data.territory === newTerritory && data.period === newPeriod && data.finished_house === newFinished_house
                    && data.half_price_m_two === newHalf_price_m_two && data.tourist === newTourist
            );
            if (existingData) {
                mensaje = "Ya existe ese dato";
                return;
            }
    
            const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFile)
            });
    
            const status = await res.status;
            resultStatus = status;
            if (status == 201) {
                getFile();
                mensaje = "Se ha creado el nuevo dato introducido";
                insertedData.push(newFile);
            } else if (status == 409) {
                mensaje = "El dato introducido ya existe";
                getFile();
            } else if (status == 400) {
                mensaje = "Las propiedades introducidas no tienen un formato correcto";
                getFile();
            } else {
                mensaje = "No se ha podido crear el dato introducido";
                getFile();
            }     
        }

        async function deleteEconomy(territory,period){
            resultStatus = result = "";
            const res = await fetch(API+"/"+territory+"/"+period, {
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
          
        async function deleteAll(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "DELETE"
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200 || status == 204){
                await getFile();
                mensaje = "Se han borrado correctamente los datos";
            }else{
                mensaje = "No se han podido borrar los datos";
            }
        }
    </script>

    
    

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos de Economia</h1>
    <p></p>
    {#if mensaje !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensaje}</h2>
    {/if}

    <Table striped>n
        <thead>
          <tr>
            <th style="text-decoration: underline;">Territorio:</th>
            <th style="text-decoration: underline;">Periodo:</th>
            <th style="text-decoration: underline;">Casas Finalizadas:</th>
            <th style="text-decoration: underline;">Precio medio metro cuadrado:</th>
            <th style="text-decoration: underline;">Turistas:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newTerritory}></td>
                <td><input bind:value={newPeriod}></td>
                <td><input bind:value={newFinished_house}></td>
                <td><input bind:value={newHalf_price_m_two}></td>
                <td><input bind:value={newTourist}></td>
                <td><Button color="success" on:click={createEconomy}>Crear</Button></td>
            </tr>
        
        {#each economy_stats as economy }
          <tr>
            <td>{economy.territory}</td>
            <td>{economy.period}</td>
            <td>{economy.finished_house}</td>
            <td>{economy.half_price_m_two}</td>
            <td>{economy.tourist}</td>
            <td>
                <Button color="info" class="btn-sm">
                    <a href='economy-stats/{economy.territory}/{economy.period}' class="text-white text-decoration-none">Editar</a>
                  </Button>
            </td>
            <td>
                <Button color="danger" class="btn-sm" on:click={deleteEconomy(economy.territory,economy.period)}>
                  Borrar
                </Button>
              </td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deleteAll}>Borrar Datos</Button>
    </div>
    <!--
    {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {economy_stats.length}</strong>
        </p>
        <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}
    -->
