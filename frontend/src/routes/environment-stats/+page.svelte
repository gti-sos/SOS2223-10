<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Table, ButtonToolbar } from "sveltestrap";
    onMount(async () => {
        getEnvironment();
    });

    let API = "/api/v3/environment-stats";
    let mensajeUsuario = "";
    let mensajeUsuario2 = "";

    if (dev) API = "http://localhost:12345" + API;

    let environment_stats = [];
    let newYear = "";
    let newCity = "";
    let newProtected_space = "";
    let newArea = "";
    let newFire = "";
    let offset = 0;
    let limit = 10;
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
            getEnvironmentReload();
        } else if (status == 400) {
            mensajeUsuario2 = "La base de Datos no está vacía";
            mensajeUsuario = "";
        } else if (status == 200) {
            mensajeUsuario = "Datos Iniciales Cargados";
            mensajeUsuario2 = "";
            getEnvironmentReload();
        }
    }

    async function getEnvironmentReload() {
        getEnvironment().then(() => {
            setTimeout(() => {}, displayTime);
        });
    }
    async function getEnvironment() {
        resultStatus = result = "";
        const res = await fetch(`${API}?limit=${limit}&offset=${offset}`);

        if (res.ok) {
            ({
                method: "GET",
            });
        }
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            environment_stats = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }

        const status = await res.status;
        resultStatus = status;

        if (environment_stats.length === 0) {
            mensajeUsuario2 = "No hay Datos a mostrar";
            mensajeUsuario = "";
        }
    }

    let fromDate = "";
    let toDate = "";
    async function getEnvironment2() {
        resultStatus = result = "";
        let url = `${API}?from=${fromDate}&to=${toDate}`;
        const res = await fetch(url, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            environment_stats = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            mensajeUsuario = "Datos Cargados Satisfactoriamente";
            mensajeUsuario2 = "";
        }
    }

    function searchInterval() {
        getEnvironment2();
    }

    let insertedData = [];
    async function createEnvironment() {
        resultStatus = result = "";
        const newEnvironment = {
            city: newCity,
            year: parseInt(newYear),
            protected_space: parseInt(newProtected_space),
            area: parseInt(newArea),
            fire: parseInt(newFire),
        };
        // Comprobar si el nuevo dato ya ha sido insertado previamente
        const existingData = insertedData.find(
            (data) =>
                data.year === newYear &&
                data.city === newCity &&
                data.protected_space === newProtected_space &&
                data.area === newArea &&
                data.fire === newEnvironmentfire
        );
        if (existingData) {
            mensajeUsuario2 = "Ya existe ese dato";
            mensajeUsuario = "";
            return;
        }
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEnvironment),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getEnvironment();
            mensajeUsuario = "Se ha creado el nuevo dato introducido";
            mensajeUsuario2 = "";
            insertedData.push(newEnvironment);
        } else if (status == 409) {
            mensajeUsuario2 = "El dato introducido ya existe";
            mensajeUsuario = "";
            getEnvironment();
        } else if (status == 400) {
            mensajeUsuario2 =
                "Las propiedades introducidas no tienen un formato correcto";
                mensajeUsuario = "";
            getEnvironment();
        } else {
            mensajeUsuario2 = "No se ha podido crear el dato introducido";
            mensajeUsuario = "";
            getEnvironment();
        }
    }
    async function deleteEnvironment(City, Year) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + City + "/" + Year, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getEnvironment();
            mensajeUsuario = "Recurso borrado";
            mensajeUsuario2 = "";
        } else if (status == 500) {
            mensajeUsuario2 = "Error cliente";
            mensajeUsuario = "";
        } else if (status == 404) {
            getEnvironment();
            mensajeUsuario2 = "No se ha encontrado ese recurso";
            mensajeUsuario = "";
        }
    }
    async function deleteEnvironmentAll() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200 || status == 204) {
            await getEnvironment();
            mensajeUsuario = "Se han borrado correctamente los datos";
            mensajeUsuario2 = "";
        } else {
            mensajeUsuario2 = "No se han podido borrar los datos";
            mensajeUsuario = "";
        }
    }

    let url = `${API}?from=${fromDate}&to=${toDate}`;

    /* async function searchEnvironment() {
        resultStatus = result = "";
        if (`${newCity}` != "" && `${newYear}` != "") {
            const res = await fetch(`${API}/${newCity}/${newYear}`, {
                method: "GET",
            });
            const status = await res.status;
            resultStatus = status;
            if (status == 200) {
                const data = await res.json();
                environment_stats = [data]; // Actualizar la lista con el resultado de búsqueda
                mensajeUsuario = `Resultado de búsqueda para ${newCity} en ${newYear}`;
                mensajeUsuario2 = "";
            } else if (status == 404) {
                environment_stats = []; // Limpiar la lista si no se encuentra ningún resultado
                mensajeUsuario2 = `No se encontraron resultados para ${newCity} en ${newYear}`;
                mensajeUsuario = "";
            } else {
                mensajeUsuario2 = "No se ha podido realizar la búsqueda";
                mensajeUsuario = "";
            }
        } else if (`${newCity}` != "") {
            resultStatus = result = "";
            const res = await fetch(`${API}/${newCity}`);

            if (res.ok) {
                ({
                    method: "GET",
                });
            }
            try {
                const data = await res.json();
                const status = await res.status;
                result = JSON.stringify(data, null, 2);
                environment_stats = data;
                if (status == 200) {
                    mensajeUsuario = `Resultado de búsqueda para ${newCity}`;
                    mensajeUsuario2 = "";
                } else if (status == 404) {
                    mensajeUsuario2 = `No se encontraron resultados para ${newCity}`;
                    mensajeUsuario = "";
                }
            } catch (error) {
                console.log(`Error parsing result: ${error}`);
                mensajeUsuario2 = `No se encontraron resultados para ${newCity}`;
                mensajeUsuario = "";
            }
            const status = await res.status;
            resultStatus = status;
        } else if (`${newYear}` != "") {
            resultStatus = result = "";
            const res = await fetch(`${API}?year=${newYear}`);
            if (res.ok) {
                ({
                    method: "GET",
                });
            }
            try {
                const data = await res.json();
                const status = await res.status;
                result = JSON.stringify(data, null, 2);
                environment_stats = data;
                if (status == 200 && !(data.length === 0)) {
                    mensajeUsuario = `Resultado de búsqueda para el año ${newYear}`;
                    mensajeUsuario2 = "";
                } else if (status == 404) {
                    mensajeUsuario2 = `No se encontraron resultados para el año ${newYear}`;
                    mensajeUsuario = "";
                } else if (data.length === 0) {
                    mensajeUsuario2 = `No se encontraron resultados para el año ${newYear}`;
                    mensajeUsuario = "";
                }
            } catch (error) {
                console.log(`Error parsing result: ${error}`);
                mensajeUsuario2 = `No se encontraron resultados para el año ${newYear}`;
                mensajeUsuario = "";
            }
            const status = await res.status;
            resultStatus = status;
        } else if (`${newProtected_space}` != "") {
            resultStatus = result = "";
            const res = await fetch(
                `${API}?protected_space=${newProtected_space}`
            );
            if (res.ok) {
                ({
                    method: "GET",
                });
            }
            try {
                const data = await res.json();
                const status = await res.status;
                result = JSON.stringify(data, null, 2);
                environment_stats = data;
                if (status == 200 && !(data.length === 0)) {
                    mensajeUsuario = `Resultado de búsqueda para nº Espacios Protegidos: ${newProtected_space}`;
                    mensajeUsuario2 = "";
                } else if (status == 404) {
                    mensajeUsuario2 = `No se encontraron resultados para nº Espacios Protegidos: ${newProtected_space}`;
                    mensajeUsuario = "";
                } else if (data.length === 0) {
                    mensajeUsuario2 = `No se encontraron resultados para nº Espacios Protegidos: ${newProtected_space}`;
                    mensajeUsuario = "";
                }
            } catch (error) {
                console.log(`Error parsing result: ${error}`);
                mensajeUsuario2 = `No se encontraron resultados para nº Espacios Protegidos: ${newProtected_space}`;
                mensajeUsuario = "";
            }
            const status = await res.status;
            resultStatus = status;
        }
        else if (`${newArea}` != "") {
            resultStatus = result = "";
            const res = await fetch(
                `${API}?area=${newArea}`
            );
            if (res.ok) {
                ({
                    method: "GET",
                });
            }
            try {
                const data = await res.json();
                const status = await res.status;
                result = JSON.stringify(data, null, 2);
                environment_stats = data;
                if (status == 200 && !(data.length === 0)) {
                    mensajeUsuario = `Resultado de búsqueda para Area: ${newArea}`;
                    mensajeUsuario2 = "";
                } else if (status == 404) {
                    mensajeUsuario2 = `No se encontraron resultados para Area: ${newArea}`;
                    mensajeUsuario = "";
                } else if (data.length === 0) {
                    mensajeUsuario2 = `No se encontraron resultados para Area: ${newArea}`;
                    mensajeUsuario = "";
                }
            } catch (error) {
                console.log(`Error parsing result: ${error}`);
                mensajeUsuario2 = `No se encontraron resultados para Area: ${newArea}`;
                mensajeUsuario = "";
            }
            const status = await res.status;
            resultStatus = status;
        }
    } */
    async function searchEnvironment() {
  const queryParams = [];

  if (newCity) queryParams.push(`city=${newCity}`);
  if (newYear) queryParams.push(`year=${newYear}`);
  if (newProtected_space) queryParams.push(`protected_space=${newProtected_space}`);
  if (newArea) queryParams.push(`area=${newArea}`);
  if (newFire) queryParams.push(`fire=${newFire}`);


  const queryString = queryParams.join('&');

  if (!queryString) {
    mensajeUsuario = "Debe ingresar algún criterio de búsqueda";
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
    environment_stats = data;
    mensajeUsuario = `Resultados de búsqueda: ${data.length} elementos encontrados`;
    mensajeUsuario2 = "";
  } else if (status === 404) {
    environment_stats = [];
    mensajeUsuario2 = "No se encontraron resultados para la búsqueda";
    mensajeUsuario = "";
  } else {
    mensajeUsuario2 = "No se ha podido realizar la búsqueda";
    mensajeUsuario = "";
  }
}


    async function handlePrevPage() {
        offset = Math.max(offset - limit, 0);

        getEnvironment();
    }

    async function handleNextPage() {
        offset += limit;
        if (offset > 20) {
            offset = 20;
        }
        getEnvironment();
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
            .success {
                text-align: center;
                padding: 10px;
                background-color: #d4edda;
                color: #155724;
                margin-bottom: 20px;
                border: 1px solid #c3e6cb;
                border-radius: 5px;
            }
        </style>
    </head>

    <body>
        <h2>Datos Medio Ambiente</h2>
        <div class="botones">
            <div style="text-align: center;">
                <div class="button-toolbar">
                    <button class="button" on:click={loadData}
                        >Datos Iniciales</button
                    >
                </div>
                {#if mensajeUsuario != ""}
                    <div class="success">{mensajeUsuario}</div>
                {/if}
            </div>
            <div>
                {#if mensajeUsuario2 != ""}
                    <div class="alert">{mensajeUsuario2}</div>
                {/if}
            </div>
        </div>
        <div
            style="display: flex; justify-content: center; align-items: center;"
        >
            <button class="button" on:click={getEnvironment}
                >Obtener Datos Medio Ambiente</button
            >
        </div>

        <form
            on:submit|preventDefault={searchInterval}
            class="p-3 border rounded"
        >
            <div class="form-group">
                <label for="from" class="font-weight-bold">Desde:</label>
                <input
                    type="number"
                    id="from"
                    bind:value={fromDate}
                    class="form-control form-control-sm small-input"
                    min="1900"
                    max="2100"
                    step="1"
                    pattern="\d+"
                />
            </div>
            <div class="form-group">
                <label for="to" class="font-weight-bold">Hasta:</label>
                <input
                    type="number"
                    class="form-control form-control-sm"
                    id="to"
                    bind:value={toDate}
                />
            </div>
            <Button color="primary" type="submit" class="mt-3">Buscar</Button>
        </form>

        <Table striped>
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
                    <td><input bind:value={newCity} /></td>
                    <td><input bind:value={newYear} /></td>
                    <td><input bind:value={newProtected_space} /></td>
                    <td><input bind:value={newArea} /></td>
                    <td><input bind:value={newFire} /></td>
                    <td
                        ><button class="button" on:click={createEnvironment}
                            >Crear</button
                        ></td
                    >
                    <td
                        ><button class="button" on:click={searchEnvironment}
                            >Buscar</button
                        ></td
                    >
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
                                <a
                                    href="environment-stats/{Environment.city}/{Environment.year}"
                                    class="text-white text-decoration-none"
                                    >Editar</a
                                >
                            </Button>
                        </td>
                        <td>
                            <Button
                                color="danger"
                                class="btn-sm"
                                on:click={() =>
                                    deleteEnvironment(
                                        Environment.city,
                                        Environment.year
                                    )}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
        <div class="button-container">
            <Button
                color="danger"
                on:click={deleteEnvironmentAll}
                class="btn-sm"
            >
                Borrado de Datos
            </Button>

            <button on:click={handlePrevPage}>Anterior</button>
            <button on:click={handleNextPage}>Siguiente</button>
        </div>
    </body>
</html>
