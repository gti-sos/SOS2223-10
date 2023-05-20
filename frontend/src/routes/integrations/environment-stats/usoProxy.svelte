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

    async function mostrar(apiData) {
        const chartContainer = document.getElementById("chart-container");

        // Obtener los valores para cada serie de datos
    //    const territories = apiData.map((data) => data.territory);

        const territories = [...new Set(apiData.map((data) => data.territory))];
        const jobsIndustry = apiData.map((data) => data.jobs_industry);
        

        // Configurar el gráfico
        const chartOptions = {
            chart: {
                type: "column",
            },
            title: {
                text: "Datos de empleo e innovación por territorio",
            },
            xAxis: {
                categories: territories,
            },
            yAxis: {
                title: {
                    text: "Cantidad",
                },
            },
            series: [
                {
                    name: "Empleos en la industria",
                    data: jobsIndustry,
                },
              
            ],
        };

        // Crear la instancia del gráfico Highcharts
        Highcharts.chart(chartContainer, chartOptions);
    }
</script>

<svelte:head>
  <script
  src="https://code.highcharts.com/highcharts.js"
    ></script>
</svelte:head>


<main>
    <div id="chart-container" style="width: 1000px;height:400px;" />
  
  </main>