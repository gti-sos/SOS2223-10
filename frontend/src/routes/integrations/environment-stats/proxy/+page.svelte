<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from "svelte";
    
    let apiSOS = "https://sos2223-17.appspot.com/proxyjgo";
   
    let apiJose ="https://sos2223-17.appspot.com/api/v2/self-employed-stats";

    let dato1="";
    let dato2="";

    onMount(async () => {
        loadAll();
    });

    async function loadAll(){
        dato1 = await apiPropia();
        dato2 = await apiSOSProxy();
        loadHChart(dato1, dato2);
    }

    async function apiPropia(){
        let gdata1 = []
        const url = apiJose;//url compañero sos
        const options = {
            method: 'GET'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            //console.log(result);
            gdata1=result.filter(obj=>obj.territory==="Sevilla"); 
        } catch (error) {
            console.error(error);
        }
        console.log(gdata1.map((objeto) => { return objeto.employee; }));
        let res=[];
        //for (let i = 10; i <= 20; i++) {res.push(i);}
        return res.concat(gdata1.map((objeto) => { return objeto.employee; }));
    }

    async function apiSOSProxy(){
        let gdata2 = [];
        const url = apiSOS;//url compañero
        const options = {
            method: 'GET'
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            //console.log(result);
            gdata2 = result.filter(obj=>obj.province==="Sevilla");
        } catch (error) {
            console.error(error);
        }
        console.log(gdata2.map((objeto) => { return parseInt(objeto.minimun_temperature); }));
        let res=[];
        //for (let i = 10; i <= 20; i++) {res.push(i);}
        return res.concat(gdata2.map((objeto) => { return parseInt(objeto.minimun_temperature); }));
    }

    async function loadHChart(gdata1, gdata2){
        Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        accessibility: {
            description: 'Area de la provincia de sevilla'
        },
        title: {
            text: 'Fuente: JSCHARTING'
        },
        subtitle: {
            text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
                'target="_blank">FAS</a>'
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            },
            accessibility: {
                rangeDescription: 'Range: 2017 to 2020.'
            }
        },
        yAxis: {
            title: {
                text: 'Valor/Tª'
            },
            labels: {
                formatter: function () {
                    return this.value + 'K';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 2015,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Sevilla-autonomos',
            data: gdata1
        }, {
            name: 'Sevilla-agroclima',
            data: gdata2
        }]
    });

    }
</script>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Datos de sevilla
        </p>
    </figure>
</main>