<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    let API = "/api/v2/economy-stats";

    if (dev) API = "http://localhost:12345" + API;

    let APIproxy = "https://sos2223-10.appspot.com/proxyJRM";
    let stats = [];
    let apiData = "";
    let result = "";
    let resultStatus = "";
    let territory = [];
    let period = [];
    let finished_house = [];
    let half_price_m_two = [];
    let tourist = [];

    async function getDataMia() {
        console.log("Fetching stats....");
        const res = await fetch(API);
        if (res.ok) {
            const data = await res.json();
            stats = data;
            console.log("Estadísticas recibidas: " + stats.length);
            // Inicializamos los arrays para mostrar los datos
            stats.forEach((stat) => {
                territory.push(stat.territory);
                period.push(stat.period);
                finished_house.push(stat.finished_house);
                half_price_m_two.push(stat.half_price_m_two);
                tourist.push(stat.tourist);
                console.log(stats)
            });
        } else {
            console.log("Error cargando los datos");
        }
    }

    let year=[];
    let wholesale_trade=[];
    async function getData() {
        resultStatus = result = "";

        // Llamada a la API original
        const res = await fetch(APIproxy, {
            method: "GET",
        });
        console.log(res);
        try {
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived, null, 2);
            apiData = dataReceived;
            apiData.forEach((stat) => {
                year.push(stat.year);
                wholesale_trade.push(stat.wholesale_trade);
            });
            console.log(apiData);  
            console.log(year);
            console.log(wholesale_trade); 
        } catch (error) {
            console.log(`Error parseando el resultado de la API: ${error}`);
        }
    }

    onMount(async () => {
        await getData();
        await getDataMia();

        const trace5 = {
            x: period,
            y: half_price_m_two,
            type: "area",
            name: "número de turistas",
            marker: {
                color: "purple",
            },
        };

        const trace6 = {
            x: year,
            y: wholesale_trade,
            type: "scatter",
            name: "Número de visitas",
            marker: {
                color: "red",
            },
        };

        const dataPlotly4 = [trace5, trace6];

        const layout3 = {
            xaxis: {
                type: "category",
                title: "Fecha",
            },
            yaxis: {
                title: "Visitas",
            },
            margin: {
                t: 50,
                b: 50,
                l: 50,
                r: 50,
            },
            title: "Integración numero de turistas con el número de visitas de tweets",
        };

        const plotlyScript = document.createElement("script");
        plotlyScript.src = "https://cdn.plot.ly/plotly-2.3.0.min.js";
        plotlyScript.onload = () => {
            // Crear la gráfica
            Plotly.newPlot("myDiv3", dataPlotly4, layout3);
        };
        document.head.appendChild(plotlyScript);
    });
</script>

<div id="myDiv3" />
