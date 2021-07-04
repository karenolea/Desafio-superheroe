//Cuando el documento este listo
$(document).ready(function () {
    //Agregar acción "click" a botón buscar
    $('#btn-buscar').on('click', function () {
        //Obtener valor de textbox 
        let superHeroe = $("#respuesta").val()
        //Crear expresión regular para validar sólo números
        let regex = /^([0-9])*$/; 

        //Validar expresión regular y rango de numeros (1-731)
        if (regex.test(superHeroe) && parseInt(superHeroe) < 732 && parseInt(superHeroe) > 0) {
            //En caso de ser correcto, llamar función para buscar heroe por ID 
            CargarHeroe(superHeroe);
        } else {
            //En caso incorrecto, mostrar mensaje correspondiente
            alert("Debe ingresar solo números (1-731)");
        }
    });
});
//Función para llamar Cargar información de heroe por ID
function CargarHeroe(superHeroe) {
    //Token de accesos a API
    const token = '10224961478282479';
    //Llamadar por AJAX a la API 
    $.ajax({
        type: "GET",
        url: `https://superheroapi.com/api.php/${token}/${superHeroe}`,
        dataType: "json",
        success: function (resp) {
            //Imprime HTML con información de heroe
            /* Cambié innerHTML (JS) por .html() de JQuery */
            $("#informacion-heroe").html(`     
            <div class="row p-5">
                <div class="col-4">
                    <img src="${resp.image.url}" style="border-radius: 30px; height: auto; width:100%" alt="...">
                </div>
                <div class="card-body col-4 style=height: auto; width:100px">
                    <h5 style="font-size: 34px; font-weight: bold" class="card-title">Nombre: ${resp.name}</h5>
                    <p class="card-text"><span class="fw-bold">Conexiones:</span> ${resp.connections['group-affiliation']}</p>
                    <p class="card-text"><span class="fw-bold">Publicado por:</span> ${resp.biography.publisher}</p>
                    <p class="card-text"><span class="fw-bold">Ocupacion:</span> ${resp.work.occupation}</p>
                    <p class="card-text"><span class="fw-bold">Primera aparición:</span> ${resp.biography['first-appearance']}</p>
                    <p class="card-text"><span class="fw-bold">Altura:</span> ${resp.appearance.height}</p>
                    <p class="card-text"><span class="fw-bold">Peso:</span> ${resp.appearance.weight}</p>
                    <p class="card-text"><span class="fw-bold">Alianzas:</span> ${resp.biography.aliases}</p>   
                </div>
                </div>  
            </div>
            `);
         
            //Guardar y convertir en int powerstats de heroe
            let combat = parseInt(resp.powerstats.combat);
            let durability = parseInt(resp.powerstats.durability);
            let intelligence = parseInt(resp.powerstats.intelligence);
            let power = parseInt(resp.powerstats.power);
            let speed = parseInt(resp.powerstats.speed);
            let strength = parseInt(resp.powerstats.strength);
           
            //Inicializar CanvasJS
            var chart = new CanvasJS.Chart("chartContainer",
            {
                title: {
                    //Título del gráfico
                    text: `Estadísticas de poder para ${resp.name}`
                },
                legend: {
                    //Tamaño de la leyenda
                    maxWidth: 350,
                    itemWidth: 120
                },
                theme: "light2",
                data: [
                    {
                        type: "pie", 
                        showInLegend: true,
                        legendText: "{indexLabel}", //Texto de leyenda del grafico (parte de abajo)
                        toolTipContent: "<b>{label}</b>: {y}", //muestra información en el tooltip(hover) 
                        dataPoints: [
                            //indexLabel: Texto descriptivo de cada trozo de torta
                            { y: intelligence, label: `Intelligence`,  indexLabel: `Intelligence (${intelligence})`},
                            { y: strength, label: `Strength`, indexLabel: `Strength (${strength})`},
                            { y: speed, label: `Speed`, indexLabel: `Speed (${speed})`},
                            { y: durability, label: `Durability`, indexLabel: `Durability (${durability})`},
                            { y: power, label: `Power`, indexLabel: `Power (${power})`},
                            { y: combat, label: `Combat`, indexLabel: `Combat (${combat})`},
                            
                        ]
                    }
                ]
            });
            //Renderizar (imprimir) canvas
            chart.render();  
        },
        error: function (error) {
            //En caso de error con la API mostrar mensaje
            console.log("error")
        }
    });
}

