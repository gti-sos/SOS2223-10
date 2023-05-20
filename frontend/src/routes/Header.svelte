<main>
    <!--    <nav>
        <div class="container">
            <a href="/">Inicio</a>
            <a href="/economy-stats">Datos Economía</a>
            <a href="/environment-stats">Datos Medio Ambiente</a>
            <a href="/employment-stats">Datos Empleo</a>
        </div>
        <div class="container">
            <a href="/graph/economy-stats">Gráfica Economía</a>
            <a href="/graph/employment-stats">Gráfica Empleo</a>
            <a href="/graph/environment-stats">Gráfica Medio Ambiente</a>
        </div>
        <div class= "container">
            <a href="/integrations/economy-stats">Integraciones/Usos Economía</a>
            <a href="/integrations/employment-stats">Integraciones/Usos Empleo</a>
            <a href="/integrations/environment-stats">Integraciones/Usos Medio Ambiente</a>
        </div>
    </nav> -->

    <!-- HTML opcion 2 -->
    <nav>
        <div class="container">
            <a href="/">Inicio</a>
            <a href="/economy-stats">Datos Economía</a>
            <a href="/environment-stats">Datos Medio Ambiente</a>
            <a href="/employment-stats">Datos Empleo</a>
        </div>
        <div class="container">
            <a href="/graph/economy-stats">Gráfica Economía</a>
            <a href="/graph/employment-stats">Gráfica Empleo</a>
            <a href="/graph/environment-stats">Gráfica Medio Ambiente</a>
        </div>
        <div class="container">
            <a href="/integrations/economy-stats">Integraciones/Usos Economía</a
            >
            <a href="/integrations/employment-stats"
                >Integraciones/Usos Empleo</a
            >
            <a href="/integrations/environment-stats"
                >Integraciones/Usos Medio Ambiente</a
            >
            <a href="/analytics"
                >Integracion Grupo</a
            >
        </div>
    </nav>
</main>

<style>
    /*  a {
        color : rgb(2, 56, 107);
        text-decoration: none;
        font-size: 20px;
    }
    .container {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        text-align: center;
    } */

    /* CSS opcion 2 */

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(2, 56, 107);
        color: white;
        padding: 20px;
    }

    nav a {
        text-decoration: none;
        color: white;
        margin: 0 10px;
        font-weight: bold;
        transition: all 0.2s ease-in-out;
    }

    nav a:hover {
        transform: scale(1.1);
    }

    .container {
        display: flex;
        grid-template-columns: 25% 25% 25% 25%;
        text-align: center;
    }

    .container a:first-child {
        margin-left: 0;
    }

    @media (max-width: 768px) {
        nav {
            flex-wrap: wrap;
        }

        .container {
            margin-top: 10px;
        }

        .container a {
            margin: 0 5px;
            font-size: 0.8rem;
        }
    }
</style>
