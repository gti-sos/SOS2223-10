<script>
    //@ts-nocheck
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { Table, Button } from "sveltestrap";
    onMount(async () => {
        getFiles();
    });
    let API = "/api/v2/economy-stats";
    if (dev) {
        API = "http://localhost:12345" + API;
    }
    let datos = [];
    let newTerritory = "";
    let newPeriod = "";
    let newfinishedHouse = "";
    let newHalfPriceTwo = "";
    let newTourist = "";
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
                territory: newTerritory,
                period: newPeriod,
                finished_house: newfinishedHouse,
                half_price_m_two: newHalfPriceTwo,
                tourist: newTourist,
            }),
        });
        const status = await res.status;
        resultStatus = status;
        if (status == 201) {
            getFiles();
        }
    }
    async function deleteFile(province, year) {
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
    Province: <input bind:value={newTerritory} />
    Year: <input bind:value={newPeriod} />
    Traveler: <input bind:value={newfinishedHouse} />
    Overnight: <input bind:value={newHalfPriceTwo} />
    Average: <input bind:value={newTourist} />
    <Button on:click={createFile}>Create</Button>
</div>

<h1 style="text-align: center;">economy-stats</h1>
<Table>
    <thead>
        <tr>
            <th>Territory</th>
            <th>Period</th>
            <th>Finished_house</th>
            <th>Half_price_m_two</th>
            <th>Tourist</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each datos as d}
            <tr>
                <td>{d.territory}</td>
                <td>{d.period}</td>
                <td>{d.finished_house}</td>
                <td>{d.half_price_m_two}</td>
                <td>{d.tourist}</td>
                <td>
                    <Button on:click={deleteFile(d.territory, d.period)}
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
