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
    let acierto = "";

    if (dev) API = "http://localhost:12345" + API;

    let employment_stats = [];
    let newPeriod = "";
    let newProvince = "";
    let newpopulation_over_16_years = "";
    let newactivity_men_percentage = "";
    let newactivity_women_percentage = "";
    const displayTime = 1500;

    let result = "";
    let resultStatus = "";
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

    async function getEmployment() {
        resultStatus = result = "";
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
                data.period === newperiod &&
                data.province === newProvince &&
                data.population_over_16_years === newPopulation_over_16_years &&
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
    //5 valores
    async function searchProvincia() {
        resultStatus = result = "";
        const res = await fetch(`${API}/${newProvince}`, {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            const data = await res.json();
            employment_stats = [data]; // Actualizar la lista con el resultado de búsqueda
            acierto = `Resultado de búsqueda para ${newProvince}`;
        } else if (status == 404) {
            employment_stats = []; // Limpiar la lista si no se encuentra ningún resultado
            mensajeUsuario = `No se encontraron resultados para ${newProvince}`;
        } else {
            mensajeUsuario = "No se ha podido realizar la búsqueda";
        }
    }
    async function searchPeriodo() {
        resultStatus = result = "";
        const res = await fetch(`${API}/${newPeriod}`, {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            const data = await res.json();
            employment_stats = [data]; // Actualizar la lista con el resultado de búsqueda
            acierto = `Resultado de búsqueda para ${newPeriod}`;
        } else if (status == 404) {
            employment_stats = []; // Limpiar la lista si no se encuentra ningún resultado
            mensajeUsuario = `No se encontraron resultados para ${newProvince} en ${newPeriod}`;
        } else {
            mensajeUsuario = "No se ha podido realizar la búsqueda";
        }
    }
    async function createAndReload() {
        createEmployment().then(() => {
            setTimeout(() => {}, displayTime);
        });
    }
    // Paginación
</script>

<main>
    <h1>Bienvenido a la API employment_stats</h1>
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
                    <button class="button" on:click={loadData}
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

        <form
            on:submit|preventDefault={searchEmployment}
            class="p-3 border rounded"
        >
            <div class="form-group">
                <label for="province" class="font-weight-bold">Provincia:</label
                >
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
        <!-- modificado 5 -->
        <form
            on:submit|preventDefault={searchPeriodo}
            class="p-3 border rounded"
        >
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

        <form
            on:submit|preventDefault={searchProvincia}
            class="p-3 border rounded"
        >
            <div class="form-group">
                <label for="period" class="font-weight-bold">Provincia:</label>
                <input
                    type="text"
                    class="form-control form-control-sm"
                    id="province"
                    bind:value={newProvince}
                />
            </div>
            <Button color="primary" type="submit" class="mt-3">Buscar</Button>
        </form>

        <div>
            <button class="button" on:click={getEmployment}
                >Obtener Datos Empleo</button
            >
        </div>

        <table>
            <thead>
                <tr>
                    <th>Provincia</th>
                    <th>Periodo</th>
                    <th>Poblacion mayor de edad</th>
                    <th>Porcentaje de actividad en hombres</th>
                    <th>Porcentaje de actividad en mujeres</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value={newProvince} /></td>
                    <td><input bind:value={newPeriod} /></td>
                    <td><input bind:value={newpopulation_over_16_years} /></td>
                    <td><input bind:value={newactivity_men_percentage} /></td>
                    <td><input bind:value={newactivity_women_percentage} /></td>
                    <td
                        ><button class="button" on:click={createAndReload}
                            >Crear</button
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
    </body>
</html>

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
