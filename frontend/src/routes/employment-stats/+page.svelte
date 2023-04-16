<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table, ButtonToolbar } from "sveltestrap";
    onMount(async () => {
        getEmployment();
    });

    let API = "/api/v2/employment-stats";
    let mensajeUsuario = "";
    let mensajeUsuario2 ="";
    let acierto = "";

    if (dev) API = "http://localhost:12345" + API;
//SI PONEMOS ALGO EN "" ES LO QUE SALDRA EN EL RECUADRO DE TEXTO DE ENTRADA.
    let employment_stats = [];
    let newPeriod = "";
    let newProvince = "";
    let newpopulation_over_16_years = "";
    let newactivity_men_percentage = "";
    let newactivity_women_percentage = "";
    const displayTime = 1500;

    let result = "";
    let resultStatus = "";
    let fromPeriod = 0;
    let toPeriod = 0;
    

    async function getEmployment() {
        resultStatus = result = "";
        const url = `${API}?offset=${offset}&limit=${limit}`;

        const res = await fetch(url, {
            method: "GET",
        });

        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }

        const status = await res.status;
        resultStatus = status;
    }
    /*
    async function getFromTo() {
        resultStatus = result = "";
        const url = `${API}?from=${fromPeriod}&to=${toPeriod}`;
        
        const res = await fetch(url, {
            method: "GET",
        });

        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }

        const status = await res.status;
        resultStatus = status;
    }
    */
    async function getEmployment2() {
        resultStatus = result = "";
        let url = `${API}?from=${fromPeriod}&to=${toPeriod}`;
        const res = await fetch(url, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            acierto = "Datos Cargados Satisfactoriamente";
            mensajeUsuario2 = "";
        }
    }

    
    async function loadData() {
        resultStatus = result = "";
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getEmployment();
        }
    }
    async function loadAndReload() {
        loadData().then(() => {
            setTimeout(() => {
                location.reload(); // Recargar la página después de un tiempo de espera
            }, displayTime);
        });
    }
    
/*
    async function getEmployment() {
        resultStatus = result = "";
        //const url = `${API}?limit=${limit}`;
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    */

    let insertedData = [];
    async function createEmployment() {
        resultStatus = result = "";
        const newEmployment = {
            province: newProvince,
            period: parseInt(newPeriod),
            population_over_16_years: parseInt(newpopulation_over_16_years),
            activity_men_percentage: parseFloat(newactivity_men_percentage),
            activity_women_percentage: parseFloat(newactivity_women_percentage),
        };
        // Comprobar si el nuevo dato ya ha sido insertado previamente
        const existingData = insertedData.find(
            (data) =>
                data.period === newPeriod &&
                data.province === newProvince &&
                data.population_over_16_years === newpopulation_over_16_years &&
                data.activity_men_percentage === newactivity_men_percentage &&
                data.activity_women_percentage === newactivity_women_percentage
        );
        if (existingData) {
            mensajeUsuario = "Ya existe ese dato";
            return;
        }
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployment),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getEmployment();
            acierto = "Se ha creado el nuevo dato introducido";
            //mensajeUsuario = "Se ha creado el nuevo dato introducido";
            insertedData.push(newEmployment);
        } else if (status == 409) {
            mensajeUsuario = "El dato introducido ya existe";
            getEmployment();
        } else if (status == 400) {
            mensajeUsuario =
                "Las propiedades introducidas no tienen un formato correcto";
            getEmployment();
        } else {
            mensajeUsuario = "No se ha podido crear el dato introducido";
            getEmployment();
        }
    }
    async function deleteEmployment(Province, Period) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + Province + "/" + Period, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getEmployment();
            mensajeUsuario = "Recurso borrado";
        } else if (status == 500) {
            mensajeUsuario = "Error cliente";
        } else if (status == 404) {
            getEmployment();
            mensajeUsuario = "No se ha encontrado ese recurso";
        }
    }
    async function deleteEmploymentAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200 || status == 204) {
            await getEmployment();
            mensajeUsuario = "Se han borrado correctamente los datos";
        } else {
            mensajeUsuario = "No se han podido borrar los datos";
        }
    }
    //Busqueda original 2 valores
/*
    async function searchEmployment() {
        resultStatus = result = "";
        const res = await fetch(`${API}/${newProvince}/${newPeriod}`, {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            const data = await res.json();
            employment_stats = [data]; // Actualizar la lista con el resultado de búsqueda
            mensajeUsuario = `Resultado de búsqueda para ${newProvince} en ${newPeriod}`;
        } else if (status == 404) {
            employment_stats = []; // Limpiar la lista si no se encuentra ningún resultado
            mensajeUsuario = `No se encontraron resultados para ${newProvince} en ${newPeriod}`;
        } else {
            mensajeUsuario = "No se ha podido realizar la búsqueda";
        }
    }
    
    //////////////////////////////////////////////BUSCAR POR LAS 5 propiedades./////////////////////////////////
    async function getProvince() {
        resultStatus = result = "";
        const url = `${API}?province=${newProvince}`;

        const res = await fetch(url, {
            method: "GET",
        });

        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }

        const status = await res.status;
        resultStatus = status;
    }
    async function getPeriod() {
        resultStatus = result = "";
        const url = `${API}?period=${newPeriod}`;

        const res = await fetch(url, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    async function getPopulation_over_16_years() {
        resultStatus = result = "";
        const url = `${API}?population_over_16_years=${newpopulation_over_16_years}`;

        const res = await fetch(url, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    async function getActivity_men_percentage() {
        resultStatus = result = "";
        const url = `${API}?activity_men_percentage=${newactivity_men_percentage}`;

        const res = await fetch(url, {
            method: "GET",
        });

        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    async function getActivity_women_percentage() {
        resultStatus = result = "";
        const url = `${API}?activity_women_percentage=${newactivity_women_percentage}`;

        const res = await fetch(url, {
            method: "GET",
        });

        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            employment_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    */
    async function searchEmployment() {
  const queryParams = [];

  if (newProvince) queryParams.push(`province=${newProvince}`);
  if (newPeriod) queryParams.push(`period=${newPeriod}`);
  if (newpopulation_over_16_years) queryParams.push(`population_over_16_years=${newpopulation_over_16_years}`);
  if (newactivity_men_percentage) queryParams.push(`activity_men_percentage=${newactivity_men_percentage}`);
  if (newactivity_women_percentage) queryParams.push(`newactivity_women_percentage=${newactivity_women_percentage}`);


  const queryString = queryParams.join('&');

  if (!queryString) {
    acierto = "Debe ingresar algún criterio de búsqueda";
    mensajeUsuario2 = "";
    return;
  }

  const res = await fetch(`${API}?${queryString}`, {
    method: "GET",
  });
  
  const status = res.status;
  resultStatus = status;
  
  if (status === 200) {
    const data = await res.json();
    employment_stats = data;
    acierto = `Resultados de búsqueda: ${data.length} elementos encontrados`;
    mensajeUsuario2 = "";
  } else if (status === 404) {
    employment_stats = [];
    mensajeUsuario2 = "No se encontraron resultados para la búsqueda";
    acierto = "";
  } else {
    mensajeUsuario2 = "No se ha podido realizar la búsqueda";
    acierto = "";
  }
}


    async function createAndReload() {
        createEmployment().then(() => {
            setTimeout(() => {}, displayTime);
        });
    }
    // Paginación
    let offset = 0;
    let limit = 10;
    async function antPag() {
        if (offset >= 10) {
            offset = offset - limit;
        }
        getEmployment();
    }
    async function sigPag() {
        if (offset + limit > employment_stats.length) {
        } else {
            offset = offset + limit;
            getEmployment();
        }
    }
    
</script>

<main>
    <h1>Bienvenido a la API de Datos de Empleo</h1>
    <div style="text-align: center;">
        <h5>Desarrollada por Rafael Diaz Quintero</h5>
    </div>
</main>

<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Datos Empleo</title>

        <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
        />
<style>
        body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

h1 {
  text-align: center;
  font-size: 48px;
  margin-top: 50px;
}

.botones {
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  color: #005aaa;
  margin-bottom: 20px;
}

table {
  margin: 0 auto;
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  text-align: center;
  padding: 12px;
  border: 2px solid #d2d2d2;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

input {
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #d2d2d2;
  border-radius: 5px;
  color: #005aaa;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

.button {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 5px;
  border: none;
  color: #fff;
  background-color: #ff8800;
  text-decoration: none;
  font-size: 16px;
  margin-right: 10px;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
  background-color: #ff6600;
}

.button.delete {
  background-color: #cc0000;
}

.button.delete:hover {
  background-color: #990000;
}

.button-toolbar {
  margin-bottom: 20px;
}

.alert {
  text-align: center;
  padding: 12px;
  background-color: #ffe6cc;
  color:#721c24;
  margin-bottom: 20px;
  border: 2px solid #ffd699;
  border-radius: 5px;
}
.success {
    background-color: #d4edda; /* Color de fondo */
        color: #155724; /* Color del texto */
        border: 1px solid #c3e6cb; /* Borde del mensaje */
        padding: 10px; /* Espaciado interno */
        margin-bottom: 10px; /* Espaciado externo */
        }
        </style>
    </head>
    <body>
        <h2>Datos Empleo</h2>
        <div class="botones">
            <div style="text-align: center;">
                <div class="button-toolbar">
                    <button class="button" on:click={loadAndReload}
                        >Datos Empleo</button
                    >
                </div>
                {#if acierto != ""}
                    <div class="success">{acierto}</div>
                {/if}

                {#if mensajeUsuario != ""}
                    <div class="alert">{mensajeUsuario}</div>
                {/if}
            </div>
        </div>

        <!-- original Busca por periodo y por provincia -->
            
            
            
            <!--
                
                <form
                on:submit|preventDefault={searchEmployment}
                class="p-3 border rounded"
                >
                <div class="form-group">
                    <label for="province" class="font-weight-bold">Provincia:</label>
                <input
                type="text"
                    class="form-control form-control-sm"
                    id="province"
                    bind:value={newProvince}
                    />
                </div>
                <div class="form-group">
                    <label for="period" class="font-weight-bold">Periodo:</label>
                <input
                    type="number"
                    class="form-control form-control-sm"
                    id="period"
                    bind:value={newPeriod}
                    />
            </div>
            <Button color="primary" type="submit" class="mt-3">Buscar</Button>
        </form>

        <form on:submit|preventDefault={getEmployment} class="p-3 border rounded">
            <div class="form-group">
                <label for="from" class="font-weight-bold">Offset:</label>
                <input
                    type="number"
                    class="form-control form-control-sm"
                    id="offset"
                    bind:value={offset}
                    />
            </div>
            <div class="form-group">
                <label for="to" class="font-weight-bold">Límite:</label>
                <input
                    type="number"
                    required
                    class="form-control form-control-sm"
                    id="limit"
                    bind:value={limit}
                    />
            </div>
            <Button color="primary" type="submit" class="mt-3">Busqueda</Button>
        </form>


        <form
        on:submit|preventDefault={getProvince}
        class="p-3 border rounded"
    >
    <div class="form-group">
            <label for="period" class="font-weight-bold">Provincia:</label>
            <input
            type="text"
            required
            class="form-control form-control-sm"
                id="province"
                bind:value={newProvince}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3">Buscar</Button>
    </form>
    <form
    on:submit|preventDefault={getPeriod}
    class="p-3 border rounded"
    >
    <div class="form-group">
        <label for="period" class="font-weight-bold">Periodo:</label>
        <input
        type="number"
        required
        class="form-control form-control-sm"
        id="period"
        bind:value={newPeriod}
        />
    </div>
    <Button color="primary" type="submit" class="mt-3">Buscar</Button>
    </form>  
    <form on:submit|preventDefault={getPopulation_over_16_years}
class="p-3 border rounded"
>
<div class="form-group">
    <label for="population_over_16_years" class="font-weight-bold">Poblacion mayor 16:</label>
    <input
    type="number"
    required
    class="form-control form-control-sm"
    id="population_over_16_years"
    bind:value={newpopulation_over_16_years}
    />
</div>
    <Button color="primary" type="submit" class="mt-3">Buscar</Button>
</form>

    <form on:submit|preventDefault={getActivity_men_percentage} class="p-3 border rounded">
        <div class="form-group">
                <label for="to" class="font-weight-bold">Porcentaje hombres</label>
                <input
                type="number" 
                required
                    step="0.1" 
                    min="0"
                    class="form-control form-control-sm"
                    id="to"
                    bind:value={newactivity_men_percentage}
                />
            </div>
            <Button color="primary" type="submit" class="mt-3">Buscar</Button>
        </form>
        <form on:submit|preventDefault={getActivity_women_percentage} class="p-3 border rounded">
            <div class="form-group">
                <label for="to" class="font-weight-bold">Porcentaje mujeres:</label>
                <input
                type="number" 
                required
                    step="0.1" 
                    min="0"
                    class="form-control form-control-sm"
                    id="to"
                    bind:value={newactivity_women_percentage}
                />
            </div>
            <Button color="primary" type="submit" class="mt-3">Buscar</Button>
        </form>
        <form on:submit|preventDefault={FromTo} class="p-3 border rounded">
            <div class="form-group">
                <label for="from" class="font-weight-bold">Desde:</label>
                <input
                type="number"
                required
                    class="form-control form-control-sm"
                    id="from"
                    bind:value={fromPeriod}
                    />
                </div>
            <div class="form-group">
                <label for="to" class="font-weight-bold">Hasta:</label>
                <input
                    type="number"
                    required
                    class="form-control form-control-sm"
                    id="to"
                    bind:value={toPeriod}
                    />
                </div>
                <Button color="primary" type="submit" class="mt-3">Busqueda</Button>
            </form>
        -->

        <form on:submit|preventDefault={getEmployment2} class="p-3 border rounded">
            <div class="form-group">
                <label for="from" class="font-weight-bold">Desde:</label>
                <input
                    type="number"
                    class="form-control form-control-sm"
                    id="from"
                    bind:value={fromPeriod}
                />
            </div>
            <div class="form-group">
                <label for="to" class="font-weight-bold">Hasta:</label>
                <input
                    type="number"
                    class="form-control form-control-sm"
                    id="to"
                    bind:value={toPeriod}
                />
            </div>
            <button class="button" color="primary" type="submit">Busqueda</button>
        </form>

        <div>
            <button class="button" on:click={loadAndReload}
                >Obtener Datos Empleo</button
            >
        </div>

        <table>
            <thead>
                <tr>
                    <th>Provincia</th>
                    <th>Periodo</th>
                    <th>Poblacion mayor de 16</th>
                    <th>Porcentaje de actividad en hombres</th>
                    <th>Porcentaje de actividad en mujeres</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type = text bind:value={newProvince} /></td>
                    <td><input type = number bind:value={newPeriod} /></td>
                    <td><input type = number bind:value={newpopulation_over_16_years} /></td>
                    <td><input type = number bind:value={newactivity_men_percentage} /></td>
                    <td><input type = number bind:value={newactivity_women_percentage} /></td>
                    <td
                        ><button class="button" on:click={createAndReload}
                            >Crear</button
                        ></td
                    >
                    <td
                    ><button class="button" on:click={searchEmployment}
                        >Buscar</button
                    ></td
                >
                </tr>
                {#each employment_stats as Employment}
                    <tr>
                        <td>{Employment.province}</td>
                        <td>{Employment.period}</td>
                        <td>{Employment.population_over_16_years}</td>
                        <td>{Employment.activity_men_percentage}</td>
                        <td>{Employment.activity_women_percentage}</td>

                        <td>
                            <Button color="info" class="btn-sm">
                                <a
                                    href="employment-stats/{Employment.province}/{Employment.period}"
                                    class="text-white text-decoration-none"
                                    >Editar</a
                                >
                            </Button>
                        </td>
                        <td>
                            <Button
                                color="danger"
                                class="btn-sm"
                                on:click={deleteEmployment(
                                    Employment.province,
                                    Employment.period
                                )}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}

                <div class="mt-3">
                    <Button
                        color="danger"
                        on:click={deleteEmploymentAll}
                        class="btn-sm"
                    >
                        Borrado de Datos
                    </Button>
                </div>
            </tbody>
        </table>
        <Button on:click={antPag}>Anterior</Button>
        <Button on:click={sigPag}>Siguiente</Button>
    </body>
</html>

<!--
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
    -->
