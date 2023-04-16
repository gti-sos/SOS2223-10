<script>
    let URL = "http://localhost:12345";
</script>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <title>SOS2223-10 API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            header {
                background-color: rgb(2, 56, 107);
                color: white;
                padding: 20px;
            }
            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
            }
            a {
                color: rgb(2, 56, 107);
                text-decoration: none;
                font-size: 20px;
            }
            h1 {
                margin-top: 0;
                text-align: center;
            }
            h2 {
                margin-top: 40px;
                margin-bottom: 20px;
                font-size: 28px;
            }
            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
            }
            li {
                margin-bottom: 10px;
            }
            .section {
                margin-top: 60px;
            }
            .section-title {
                text-align: center;
                font-size: 36px;
                margin-bottom: 40px;
            }
            .section-content {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
            }
            .api-card {
                width: calc(33% - 20px);
                background-color: #f2f2f2;
                border-radius: 10px;
                box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                margin-bottom: 20px;
            }
            .api-card a {
                display: block;
                margin-bottom: 10px;
            }
            .api-card p {
                margin: 0;
            }
            .github-link {
                text-align: center;
                margin-top: 60px;
            }
            .github-link a {
                display: inline-block;
                background-color: rgb(2, 56, 107);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                transition: all 0.3s ease;
            }
            .github-link a:hover {
                background-color: white;
                color: rgb(2, 56, 107);
                border: 2px solid rgb(2, 56, 107);
            }
        </style>
    </head>
    <body>
        <header>
            <h1>SOS2223-10 API</h1>
        </header>
        <div class="container">
            <section class="section">
                <h2 class="section-title">URL Base</h2>
                <div class="section-content">
                    <div class="api-card">
                        <a
                            href="https://sos2223-10.ew.r.appspot.com/api/v2/economy-stats"
                            >Estadísticas Economía API
                        </a>
                        <p>Desarollado por Joaquín Rodríguez Mariscal</p>
                    </div>
                    <div class="api-card">
                        <a
                            href="https://sos2223-10.ew.r.appspot.com/api/v2/employment-stats"
                            >Estadísticas Empleo API</a
                        >
                        <p>Desarollado por Rafael Díaz Quintero</p>
                    </div>
                    <div class="api-card">
                        <a
                            href="https://sos2223-10.ew.r.appspot.com/api/v1/environment-stats"
                            >Estadísticas Medio Ambiente API v1</a
                        >
                        <p>Desarrollado por Rushabh Patel</p>
                    </div>
                    <div class="api-card">
                        <a
                            href="https://sos2223-10.ew.r.appspot.com/api/v2/environment-stats"
                            >Estadísticas Medio Ambiente API v2</a
                        >
                        <p>Desarrollado por Rushabh Patel</p>
                    </div>
                    <div class="api-card">
                        <a
                            href="https://sos2223-10.ew.r.appspot.com/api/v3/environment-stats"
                            >Estadísticas Medio Ambiente API v3</a
                        >
                        <p>Desarrollado por Rushabh Patel</p>
                    </div>
                   
                </div>
            </div>
        </section>
        <div>


            <div class="container">
                <section class="section">
                    <h2 class="section-title">Documentación Grupo POSTMAN </h2>
                    <div class="section-content">
                        <div class="api-card">
                            <a href="https://sos2223-10.ew.r.appspot.com/api/v2/economy-stats/docs">Documentación Economía API </a>
                            <p>Desarollado por Joaquín Rodríguez Mariscal</p>
                        </div>
                        <div class="api-card">
                            <a href="https://sos2223-10.ew.r.appspot.com/api/v2/environment-stats/docs">Documentación Medio Ambiente API v2</a>
                            <p>Desarrollado por Rushabh Patel Patel</p>
                        </div>
                        <div class="api-card">
                            <a href="https://sos2223-10.ew.r.appspot.com/api/v3/environment-stats/docs">Documentación Medio Ambiente API v3</a>
                            <p>Desarrollado por Rushabh Patel Patel</p>
                        </div>
                        <div class="api-card">
                            <a href="https://sos2223-10.ew.r.appspot.com/api/v2/employment-stats/docs">Documentación Empleo API</a>
                            <p>Desarollado por Rafael Díaz Quintero</p>
                        </div>
                    </div>
                </section>
                <div>



            <div class="container">
                <h1 class="section-title">Repositorio de github de SOS2223-10</h1>
                <ul>
                  <li>
                    <a href="https://github.com/gti-sos/SOS2223-10">SOS2223-10</a>
                  </li>
                </ul>
                <h2 class="section-title">Participantes</h2>
                <ul> 
                  <li>
                    Joaquín Rodríguez Mariscal -> economy-stats
                  </li>
                  <li>
                    Rushabh Patel Patel -> environment-stats
                  </li>
                  <li>
                    Rafael Díaz Quintero -> employment-stats
                  </li>
                </ul>
              </div>
              
              <style>
              .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
              }
              
              .section-title {
                margin-bottom: 1.5rem;
                text-align: center;
              }
              </style>
              
    
</body>
</html>
