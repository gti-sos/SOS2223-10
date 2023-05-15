<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Button, Label } from "sveltestrap";
    //let API = "/api/v2/data";
    let API = "/api/v2/employment-stats";

    if (dev) API = "http://localhost:12345" + API;

    
    let results = "";
    let data = [];
    let resultStatus = "";
    const APIEx1 = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5";

    async function getDataApi1() {
        resultStatus = results = "";
        const res = await fetch(APIEx1, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "bf07a2acb0msh7f5e40a2ed07776p1bdb14jsndbe5bc17f154",
                "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
            },
        });
        try {
            const dataRecived = await res.json();
            results = JSON.stringify(dataRecived, null, 2);
            data = dataRecived;
            console.log(data);
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    onMount(async () => {
        getDataApi1();
    });
</script>
