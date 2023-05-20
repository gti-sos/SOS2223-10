<script>
    // @ts-nocheck
    import { onMount } from "svelte";

    let APIproxy = "https://sos2223-10.appspot.com/proxyRPP";

    onMount(async () => {
        getData();
    });

    let apiData = "";
    let result = "";
  let resultStatus = "";
    async function getData() {
        resultStatus = result = "";

        // Llamada a la API original
        const res = await fetch(APIproxy, {
            method: "GET",
        });
        try {
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived, null, 2);
            apiData = dataReceived;
        } catch (error) {
            console.log(`Error parseando el resultado de la API: ${error}`);
        }

        mostrar(apiData);
    }

    // Obtener el elemento del cuerpo de la tabla
    async function mostrar(apiData) {
        const tableBody = document.getElementById("table-body");

        console.log(apiData);
        // Mostrar los datos en la tabla
        apiData.slice(0,12).forEach((data) => {
            const row = document.createElement("tr");
            row.innerHTML = `
    <td>${data.territory}</td>
    <td>${data.year}</td>
    <td>${data.jobs_industry}</td>
    <td>${data.companies_with_innovations}</td>
    <td>${data.temporary_employment}</td>
  `;
            tableBody.appendChild(row);
        });
    }
</script>

<table>
    <thead>
        <tr>
            <th>Territorio</th>
            <th>Año</th>
            <th>Empleos en la industria</th>
            <th>Empresas con innovaciones</th>
            <th>Empleo temporal</th>
        </tr>
    </thead>
    <tbody id="table-body">
        <!-- Los datos se agregarán aquí dinámicamente -->
    </tbody>
</table>
