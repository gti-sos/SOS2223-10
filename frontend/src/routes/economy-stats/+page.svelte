<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table } from "sveltestrap";
    onMount(async () => {
        getEconomy();
    });
    let API = "/api/v2/economy-stats";
    let mensaje = "";
    let mensaje2 = "";
    if (dev) API = "http://localhost:12345" + API;

    let economy_stats = [];
    let newTerritory = "";
    let newPeriod = "";
    let newFinished_house = "";
    let newHalf_price_m_two = "";
    let newTourist = "";
    let result = "";
    let resultStatus = "";
    const displayTime = 1500;

    async function loadData() {
        resultStatus = result = "";
        const res = await fetch(API + "/loadInitialData", {
            method: "GET",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getEconomy();
        }
    }
    async function loadAndReload() {
        loadData().then(() => {
            setTimeout(() => {
                location.reload(); // Recargar la página después de un tiempo de espera
            }, displayTime);
        });
    }

    async function getEconomy() {
        resultStatus = result = "";
        const url = `${API}?offset=${offset}&limit=${limit}`;

        const res = await fetch(url, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            economy_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    let insertedData = [];

    let fromPeriod = "";
    let toPeriod = "";
    async function getFromTo() {
        resultStatus = result = "";
        const url = `${API}?from=${fromPeriod}&to=${toPeriod}`;

        const res = await fetch(url, {
            method: "GET",
        });

        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            economy_stats = data;
        } catch (error) {
            console.log(`Error parseando el resultado: ${error}`);
        }

        const status = await res.status;
        resultStatus = status;
    }

    
    async function searchEconomy() {
        const queryParams = [];

        if (newTerritory) queryParams.push(`territory=${newTerritory}`);
        if (newPeriod) queryParams.push(`period=${newPeriod}`);
        if (newFinished_house)
            queryParams.push(`finished_house=${newFinished_house}`);
        if (newHalf_price_m_two) queryParams.push(`half_price_m_two=${newHalf_price_m_two}`);
        if (newTourist) queryParams.push(`tourist=${newTourist}`);

        const queryString = queryParams.join("&");

        if (!queryString) {
            mensaje = "Debe ingresar algún criterio de búsqueda";
            mensaje = "";
            return;
        }

        const res = await fetch(`${API}?${queryString}`, {
            method: "GET",
        });

        const status = res.status;
        resultStatus = status;

        if (status === 200) {
            const data = await res.json();
            economy_stats = data;
            mensaje = `Resultados de búsqueda: ${data.length} elementos encontrados`;
            mensaje2 = "";
        } else if (status === 404) {
            economy_stats = [];
            mensaje2 = "No se encontraron resultados para la búsqueda";
            mensaje = "";
        } else {
            mensaje2 = "No se ha podido realizar la búsqueda";
            mensaje = "";
        }
    }
    
    async function createEconomy() {
        resultStatus = result = "";
        const newEconomy = {
            territory: newTerritory,
            period: parseInt(newPeriod),
            finished_house: parseInt(newFinished_house),
            half_price_m_two: parseInt(newHalf_price_m_two),
            tourist: parseInt(newTourist),
        };

        const existingData = insertedData.find(
            (data) =>
                data.territory === newTerritory &&
                data.period === newPeriod &&
                data.finished_house === newFinished_house &&
                data.half_price_m_two === newHalf_price_m_two &&
                data.tourist === newTourist
        );
        if (existingData) {
            mensaje = "Ya existe ese dato";
            return;
        }

        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEconomy),
        });

        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getEconomy();
            mensaje = "Se ha creado el nuevo dato introducido";
            insertedData.push(newEconomy);
        } else if (status == 409) {
            mensaje = "El dato introducido ya existe";
            await getEconomy();
        } else if (status == 400) {
            mensaje =
                "Las propiedades introducidas no tienen un formato correcto";
            await getEconomy();
        } else {
            mensaje = "No se ha podido crear el dato introducido";
            await getEconomy();
        }
    }

    async function createAndReload() {
        createEconomy().then(() => {
            setTimeout(() => {}, displayTime);
        });
    }

    async function deleteEconomy(territory, period) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + territory + "/" + period, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getEconomy();
            mensaje = "Recurso borrado";
        } else if (status == 500) {
            mensaje = "Error cliente";
        } else if (status == 404) {
            getEconomy();
            mensaje = "No se ha encontrado ese recurso";
        }
    }

    async function deleteAndReload1(territory, period) {
        deleteEconomy(territory, period).then(() => {
            setTimeout(() => {}, displayTime);
        });
    }

    async function deleteAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200 || status == 204) {
            await getEconomy();
            mensaje = "Se han borrado correctamente los datos";
        } else {
            mensaje = "No se han podido borrar los datos";
        }
    }

    async function deleteAndReload2() {
        deleteAll().then(() => {
            setTimeout(() => {}, displayTime);
        });
    }

    let offset = 0;
    let limit = 10;

    async function antPag() {
        if (offset >= 10) {
            offset = offset - limit;
        }
        getEconomy();
    }
    async function sigPag() {
        if (offset + limit > economy_stats.length) {
        } else {
            offset = offset + limit;
            getEconomy();
        }
        console.log(offset);
        console.log(limit);
        console.log(economy_stats.length);
    }
</script>

<main>
    <h1>Bienvenido a la API Datos Economia</h1>
    <div style="text-align: center;">
        <h5>Desarrollada por Joaquín Rodríguez Mariscal</h5>
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
                font-family: "Helvetica Neue", Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #555;
                background-color: #f7f7f7;
            }

            h1 {
                text-align: center;
                font-size: 42px;
                font-weight: bold;
                margin-top: 50px;
                margin-bottom: 30px;
            }

            .botones {
                margin-bottom: 50px;
            }

            h2 {
                text-align: center;
                font-family: "Roboto", sans-serif;
                color: #333;
                font-size: 32px;
                margin-bottom: 30px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            table {
                margin: 0 auto;
                width: 100%;
                max-width: 800px;
                border-collapse: collapse;
                margin-bottom: 30px;
            }

            th,
            td {
                text-align: center;
                padding: 15px;
                border: 1px solid #ddd;
                font-size: 18px;
            }

            th {
                background-color: #f2f2f2;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            input {
                padding: 10px;
                width: 100%;
                box-sizing: border-box;
                border-radius: 5px;
                border: 1px solid #ddd;
                font-size: 18px;
                margin-bottom: 20px;
            }

            .button {
                display: inline-block;
                padding: 12px 24px;
                border-radius: 5px;
                border: none;
                color: #fff;
                background-color: #007bff;
                text-decoration: none;
                font-size: 18px;
                margin-right: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
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
                margin-bottom: 50px;
                text-align: center;
            }

            .alert {
                text-align: center;
                padding: 15px;
                background-color: #f8d7da;
                color: #721c24;
                margin-bottom: 30px;
                border: 1px solid #f5c6cb;
                border-radius: 5px;
                font-size: 18px;
                line-height: 1.4;
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

    <h1
        style="text-align: center; font-family:'Times New Roman', Times, serif; font-size: 60px;"
    >
        Datos de Economia
    </h1>
    <p />
    {#if mensaje != ""}
        <h2
            style="color: red; text-align: center; font-family:Arial, Helvetica, sans-serif"
        >
            {mensaje}
        </h2>
    {/if}

    <button class="button" on:click={loadAndReload}
        >Obetener datos economia</button
    >

    <form on:submit|preventDefault={getFromTo} class="p-3 border rounded">
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
    <!--
    <form on:submit|preventDefault={getOffsetLimit} class="p-3 border rounded">
        <div class="form-group">
            <label for="from" class="font-weight-bold">Offset:</label>
            <input
                type="number"
                class="form-control form-control-sm"
                id="offset"
                bind:value={offSet}
            />
        </div>
        <div class="form-group">
            <label for="to" class="font-weight-bold">Límite:</label>
            <input
                type="number"
                class="form-control form-control-sm"
                id="limit"
                bind:value={limite}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3">Busqueda</Button>
    </form>

    <form on:submit|preventDefault={getTerritory} class="p-3 border rounded">
        <div class="form-group">
            <label for="to" class="font-weight-bold">Territorio:</label>
            <input
                type="string"
                class="form-control form-control-sm"
                id="territory"
                bind:value={territory}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3"
            >Buscar territorio</Button
        >
    </form>
    <form on:submit|preventDefault={getPeriod} class="p-3 border rounded">
        <div class="form-group">
            <label for="to" class="font-weight-bold">Periodo:</label>
            <input
                type="number"
                class="form-control form-control-sm"
                id="period"
                bind:value={period}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3"
            >Buscar periodo</Button
        >
    </form>
    <form
        on:submit|preventDefault={getFinishedHouse}
        class="p-3 border rounded"
    >
        <div class="form-group">
            <label for="to" class="font-weight-bold">Casas Finalizadas:</label>
            <input
                type="number"
                class="form-control form-control-sm"
                id="finished_house"
                bind:value={finished_house}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3"
            >Buscar número de casas</Button
        >
    </form>
    <form on:submit|preventDefault={getHalPriceMTwo} class="p-3 border rounded">
        <div class="form-group">
            <label for="to" class="font-weight-bold"
                >Precio medio metro cuadrado:</label
            >
            <input
                type="number"
                class="form-control form-control-sm"
                id="half_price_m_two"
                bind:value={half_price_m_two}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3">Buscar precio</Button
        >
    </form>
    <form on:submit|preventDefault={getTourist} class="p-3 border rounded">
        <div class="form-group">
            <label for="to" class="font-weight-bold">Turistas:</label>
            <input
                type="number"
                class="form-control form-control-sm"
                id="tourist"
                bind:value={tourist}
            />
        </div>
        <Button color="primary" type="submit" class="mt-3"
            >Buscar número de turistas</Button
        >
    </form>
-->
    <Table striped>
        <thead>
            <tr>
                <th style="text-decoration: underline;">Territorio:</th>
                <th style="text-decoration: underline;">Periodo:</th>
                <th style="text-decoration: underline;">Casas Finalizadas:</th>
                <th style="text-decoration: underline;"
                    >Precio medio metro cuadrado:</th
                >
                <th style="text-decoration: underline;">Turistas:</th>
                <th style="text-decoration: underline;">Acción:</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value={newTerritory} /></td>
                <td><input bind:value={newPeriod} /></td>
                <td><input bind:value={newFinished_house} /></td>
                <td><input bind:value={newHalf_price_m_two} /></td>
                <td><input bind:value={newTourist} /></td>
                <td
                    ><button class="button" on:click={createEconomy}
                        >Crear</button
                    ></td
                >
                <td
                    ><button class="button" on:click={searchEconomy}
                        >Buscar</button
                    ></td
                >
            </tr>

            {#each economy_stats as economy}
                <tr>
                    <td>{economy.territory}</td>
                    <td>{economy.period}</td>
                    <td>{economy.finished_house}</td>
                    <td>{economy.half_price_m_two}</td>
                    <td>{economy.tourist}</td>
                    <td>
                        <Button color="info" class="btn-sm">
                            <a
                                href="economy-stats/{economy.territory}/{economy.period}"
                                class="text-white text-decoration-none"
                                >Editar</a
                            >
                        </Button>
                    </td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            on:click={deleteAndReload1(
                                economy.territory,
                                economy.period
                            )}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            {/each}
        </tbody>
        <button type="button" class="btn-sm" on:click={antPag}>Anterior</button>
        <button type="button" class="btn-sm" on:click={sigPag}>Siguiente</button
        >
    </Table>

    <div style="text-align: center;">
        <button type="button" class="btn btn-danger" on:click={deleteAndReload2}
            >Borrar Datos</button
        >
    </div>
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
