<script>
    // @ts-nocheck
        import { onMount } from "svelte";
        import { dev } from "$app/environment";
        import { Button, Table } from 'sveltestrap';
        onMount(async () =>{
            getFile();
        });
        let API = "/api/v2/economy-stats/territory/period";
        let mensaje = "";
        if(dev)
            API = "http:/localhost:12345"+API;
</script>