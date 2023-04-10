<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        onMount(async () =>{
            getFile();
        });
        let API = "/api/v2/employment-stats";
        let mensaje = "";
        if(dev)
            API = "http:/localhost:12345"+API
            
        let employment_stats = [];
        let newProvince = "province";
        let newPeriod = "period";
        let newpopulation_over_16_years = "population_over_16_years";
        let newactivity_men_percentage = "activity_men_percentage";
        let newactivity_women_percentage = "activity_women_percentage";
        let result = "";
        let resultStatus = "";
        async function getFile(){
            resultStatus = result = "";
            const res = await fetch(API, {
                method: "GET"
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data, null, 2);
                employment_stats = data;
            }catch(error){
                console.log(`Error parseando el resultado: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;
        }
        let insertedData = [];
        async function createFile(){
            resultStatus = result = "";
            const newFile = {
                province: newprovince,
                period: parseInt(newPeriod),
                population_over_16_years: parseInt(newpopulation_over_16_years),
                activity_men_percentage: parseInt(newactivity_men_percentage),
                activity_women_percentage: parseInt(newactivity_women_percentage)
            };
    
            
            const existingData = insertedData.find(data => 
                data.province === newprovince && data.period === newPeriod && data.population_over_16_years === newpopulation_over_16_years
                    && data.activity_men_percentage === newactivity_men_percentage && data.activity_women_percentage === newactivity_women_percentage
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

    <h1 style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;">Datos employment_stats</h1>
    <p></p>
    {#if mensaje !=""}
    <h2 style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif">{mensaje}</h2>
    {/if}

    <Table striped>
        <thead>
          <tr>
            <th style="text-decoration: underline;">Territorio:</th>
            <th style="text-decoration: underline;">Periodo:</th>
            <th style="text-decoration: underline;">Poblacion mayor de 16 años:</th>
            <th style="text-decoration: underline;">Porcentaje actividad en hombres:</th>
            <th style="text-decoration: underline;">Porcentaje actividad en mujeres:</th>
            <th style="text-decoration: underline;">Acción:</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newProvince}></td>
                <td><input bind:value={newPeriod}></td>
                <td><input bind:value={newpopulation_over_16_years}></td>
                <td><input bind:value={newactivity_men_percentage}></td>
                <td><input bind:value={newactivity_women_percentage}></td>
                <td><Button color="success" on:click={createFile}>Crear</Button></td>
            </tr>
        
        {#each employment_stats as employment }
          <tr>
            <td><a href="/employment/{employment.province}/{employment.period}">{employment.province}</a></td>
            <td>{employment.period}</td>
            <td>{employment.population_over_16_years}</td>
            <td>{employment.activity_men_percentage}</td>
            <td>{employment.activity_women_percentage}</td>
          </tr>
        {/each}
        </tbody>
    </Table>
    
    <div style="text-align: center;">
        <Button color="danger" on:click={deleteAll}>Borrar Datos</Button>
    </div>
    
    {#if resultStatus != ""}
        <p>
            <strong>Número de datos: {employment_stats.length}</strong>
        </p>
        <strong>Result:</strong>
        <pre>
    {"Código de estado: "+resultStatus}
{result}
        </pre>
    {/if}
