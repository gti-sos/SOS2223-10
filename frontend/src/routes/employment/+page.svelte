<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { Table, Button } from "sveltestrap";
    import { dev } from "$app/employment";
    onMount(async () => {
        getFiles();
    });
    let API = "/api/v2/employment-stats";
    if (dev) {
        API = "http://localhost:12345" + API;
    }
    let datos = [];
    let newProvince = "";
    let newPeriod = "";
    let newpopulation_over_16_years = "";
    let newactivity_men_percentage = "";
    let newactivity_women_percentage = "";
    let result = "";
    let resultStatus = "";
    async function getFiles() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            datos = data;
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
    }
    async function createFile() {
        resultStatus = result = "";
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                province: newProvince,
                period: newPeriod,
                population_over_16_years: newpopulation_over_16_years,
                activity_men_percentage: newactivity_men_percentage,
                activity_women_percentage: newactivity_women_percentage
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getFiles();
        }
    }
    async function deleteFile(province, period) {
        resultStatus = result = "";
        const res = await fetch(API + "/" + province, {
            method: "DELETE",
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 200) {
            getFiles();
        }
    }
</script>

<h1 style="text-align: center;">Create data</h1>

<div>
    Province: <input bind:value={newProvince} />
    Period: <input bind:value={newPeriod} />
    Population_over_16_years: <input bind:value={newpopulation_over_16_years} />
    Activity_men_percentage: <input bind:value={newactivity_men_percentage} />
    Activity_women_percentage: <input bind:value={newactivity_women_percentage} />
    <Button on:click={createFile}>Create</Button>
</div>

<h1 style="text-align: center;">economy-stats</h1>
<Table>
    <thead>
        <tr>
            <th>Province</th>
            <th>Period</th>
            <th>Population_over_16_years</th>
            <th>Activity_men_percentage</th>
            <th>Activity_women_percentage</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each datos as d}
            <tr>
                <td>{d.province}</td>
                <td>{d.period}</td>
                <td>{d.population_over_16_years}</td>
                <td>{d.activity_men_percentage}</td>
                <td>{d.activity_women_percentage}</td>
                <td>
                    <Button on:click={deleteFile(d.province, d.period)}
                        >Delete</Button
                    >
                    <Button>Edit</Button>
                </td>
            </tr>
        {/each}
    </tbody>
</Table>


{#if resultStatus != ""}
    <p id="result">
        Result: {resultStatus}
    </p>
{/if}

<style>
    #result {
        margin-top: 80px;
    }
</style>
