<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        import { page } from "$app/stores";
        onMount(async () =>{
            getEconomy_stat_dato();
        });
        let mensaje = "";
        let territroy = $page.params.territory;
        let period = $page.params.period;
        let API = "/api/v2/economy-stats/"+ territory + "/" +period;
        if(dev)
            API = "http://localhost:12345"+API
    
        let updateTerritory = territory;
        let updatePeriod = period; 
        let updateFinished_house = "Casa Finalizada";
        let updateHalf_price_m_two = "Precio medio metro cuadrado";
        let updateTourist = "Turista";
        let result = "";
        let resultStatus = "";
        async function getEconomy_stat_dato(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                updateTerritory = data.territory;
                updatePeriod = data.period; 
                updateFinished_house = data.finished_house;
                updateHalf_price_m_two = data.half_price_m_two;
                updateTourist = data.tourist;
                
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            
            const status = await res.status;
            resultStatus = status;
            if(status==404){
                mensaje = `La ruta solicitada "${territory}/${period}" no existe`;
            }
        }
        async function updateEconomy_stat(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    territory: updateTerritory,
                    period: updatePeriod,
                    finished_house: updateFinished_house,
                    half_price_m_two: updateHalf_price_m_two,
                    tourist: updateTourist
                })
            });
            const status = await res.status;
            resultStatus = status;
            if(status==200){
                getEconomy_stat_dato();
                mensaje = "Se ha actualizado el dato";
            }else if(status==400){ 
                mensaje = "Los datos introducidos no son válidos";
            }else{
                mensaje = "No se ha podido actualizar el dato";
            }       
        }

        async function deleteFile(territory,period) {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            const registros = document.getElementsByClassName("registros");
            for(let i=0; i<registros.length; i++){
                registros[i].textContent = "";
            }
            
            message = "Elemento borrado";
            c = "exito";
        }
    }
    </script>

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Agroclimatic Cambios</h1>
      
    {#if mensaje !=""}
        <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensaje}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Territorio:</th>
            <th style="text-decoration: underline;">Periodo:</th>
            <th style="text-decoration: underline;">Casa Finalizada:</th>
            <th style="text-decoration: underline;">Precio Medio Metro Cuadrado :</th>
            <th style="text-decoration: underline;">Turista:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{updateTerritory}</td>
                <td>{updatePeriod}</td>
                <td><input bind:value={updateFinished_house}></td>
                <td><input bind:value={updateHalf_price_m_two}></td>
                <td><input bind:value={updateTourist}></td>
                <td><Button color="primary" on:click={updateEconomy_stat}>Actualizar</Button></td>
            </tr>
        </tbody>
    </Table>
    <div class="registros">
        <ul>
            <li>
                territory:{updateTerritory}
            </li>
            <li>
                period: {updatePeriod}
            </li>
            <li>
                finished_house: {updateFinished_house}
            </li>
            <li>
                half_price_m_two: {updateHalf_price_m_two}
            </li>
            <li>
                tourist:{updateTourist}
            </li>
        </ul>
    </div>
    <Button id="borrar" color="danger" on:click={deleteFile(updateTerritory,updatePeriod)}>Borrar dato</Button>
    
    {#if resultStatus != ""}
            <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}    
{result}
        </pre>
    {/if}