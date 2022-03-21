document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        document.getElementById("paginaLoad").style.display = "none"
    }
  };



async function buscaPokemon(){
    document.getElementById("cerrar2").style.display = "none"
    document.getElementById("cerrar1").style.display = "inline-block"
    document.getElementById("loadPoke").style.display = "inline-block"
    const pokemon = document.getElementById("txtSearch").value;
    if(pokemon != ""){
        const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
    await fetch(url).then((respuesta) => {
        if(respuesta.status != "200"){
            document.getElementById("loadPoke").style.display = "none"
            return "Pokemon no encontrado"
        }else{
            return respuesta.json();
        }
    }).then((data) => {
        if(data == "Pokemon no encontrado"){
            swal("¡Opss!", data, "error");
        }else{
            console.log(data)
            namePokemonBus(data.name, data.id)
            imgPokemonBus(data.sprites.other.dream_world.front_default)
            alturaPokemonBus(data.height)
            pesoPokemonBus(data.weight)
            habitadPokemonBus(data.species.url);
            statPokemonBus(data.stats)
            movePokemonBus(data.moves)
            habilitysPokemonBus(data.abilities)
            document.getElementById("loadPoke").style.display = "none"
            document.getElementById("txtSearchOcult").click()
        }
        
    });
    }else{
        document.getElementById("loadPoke").style.display = "none"
        swal("¡Alerta!", "Debes escribir el nombre o colocar el ID de algun pokemon", "warning");
    }
}

async function buscaTodosPokemones(){
    document.getElementById("targetPokemon").style.display = "none"
    document.getElementById("loadPoke2").style.display = "inline-block"
    const url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
    await fetch(url).then((respuesta) => {
        if(respuesta.status != "200"){
            document.getElementById("loadPoke").style.display = "none"
            return "Pokemon no encontrado"
        }else{
            return respuesta.json();
        }
    }).then((data) => {
        if(data == "Pokemon no encontrado"){
            swal("¡Opss!", data, "error");
        }else{
            console.log(data)
            infoPokemones(data.results)
            document.getElementById("loadPoke2").style.display = "none"
            document.getElementById("targetPokemon").style.display = "contents"
        }
    });
}

const namePokemonBus = (name, id) => {
    document.getElementById("busquedaTitle").innerHTML = name + " (" + id + ")";
}

const imgPokemonBus = (src) => {
    document.getElementById("imgBusImage").src = src 
}

const alturaPokemonBus = (altura) => {
    document.getElementById("labelAlturaBus").innerHTML = altura;
}

const pesoPokemonBus = (peso) => {
    document.getElementById("labelPesoBus").innerHTML = peso;
}

const habitadPokemonBus = async (url) => {
    await fetch(url).then((respuesta) => {
        return respuesta.json();
    }).then((data) => {
        document.getElementById("labelHabitadBus").innerHTML = data.habitat.name;
    });
}

const statPokemonBus = (stats) => {
    var html = '';
    document.getElementById("stadisticas").innerHTML = '';
    var lisColores = ['bg-success','bg-info','bg-warning','bg-danger','bg-success','bg-info','bg-warning','bg-danger','bg-success','bg-info','bg-warning','bg-danger','bg-success','bg-info','bg-warning','bg-danger']
    let color = 0;
    stats.map(function(estadisticas) {
        let valorStadistica = (estadisticas.base_stat * 100 ) / 200;
        color++;
        html += '<label>' + estadisticas.stat.name + '</label>'
        html += '<div class="progress">'
        html += '<div class="progress-bar ' + lisColores[color] + '" role="progressbar" style="width: ' + valorStadistica + '%" aria-valuenow="' + valorStadistica + '" aria-valuemin="0" aria-valuemax="200"></div>'
        html += '</div>'
        html += '<br>'
    })

    document.getElementById("stadisticas").innerHTML = html;
}

const movePokemonBus = (moves) => {
    var html = '';
    document.getElementById("listMoves").innerHTML = '';
    html += '<label><strong>Movimientos</strong><br></label>'
    html += '<ol class="list-group list-group-numbered">'
    moves.map(function (move){
        html += '<li class="list-group-item">' + move.move.name + '</li>'
    })
    html += '</ol>'
    document.getElementById("listMoves").innerHTML = html;
}

const habilitysPokemonBus = (habilitys) => {
    var html = '';
    document.getElementById("listHability").innerHTML = '';
    html += '<label><strong>Habilidades</strong><br></label>'
    html += '<ol class="list-group list-group-numbered">'
    habilitys.map(function (habilitys){
        html += '<li class="list-group-item">' + habilitys.ability.name + '</li>'
    })
    html += '</ol>'
    document.getElementById("listHability").innerHTML = html;
}

const infoPokemones = (list) => {
    var html = '';
    document.getElementById("targetPokemon").innerHTML = '';
    list.map(function(pokemon) {
        listPokemonId(pokemon.url).then((results) => {
            console.log(results)
            html += '<div class="col">'
            html += '<div class="card text-center" style="align-items: center;">'
            html += '<img src="' + results.sprites.other.dream_world.front_default + '" class="card-img-top imgBusImage" alt="...">'
            html += '<div class="card-body">'
            html += '<h5 class="card-title">'+ results.name +'</h5>'
            html += '<button class="btn btn-primary" onclick="buscaPokemon2(' + "'" + results.name + "'" + ')">Ver info</a>'
            html += '</div>'
            html += '</div>'
            html += '</div>'
            document.getElementById("targetPokemon").innerHTML = html;
        });  
    })
}

const listPokemonId = async (url) => {
    const datos = await fetch(url);
    const respuesta = datos.json()
    return  respuesta;
}

async function buscaPokemon2(name){
    document.getElementById("cerrar1").style.display = "none"
    document.getElementById("cerrar2").style.display = "inline-block"
    if(name != ""){
        const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    await fetch(url).then((respuesta) => {
        if(respuesta.status != "200"){
            return "Pokemon no encontrado"
        }else{
            return respuesta.json();
        }
    }).then((data) => {
        if(data == "Pokemon no encontrado"){
            swal("¡Opss!", data, "error");
        }else{
            namePokemonBus(data.name, data.id)
            imgPokemonBus(data.sprites.other.dream_world.front_default)
            alturaPokemonBus(data.height)
            pesoPokemonBus(data.weight)
            habitadPokemonBus(data.species.url);
            statPokemonBus(data.stats)
            movePokemonBus(data.moves)
            habilitysPokemonBus(data.abilities)
            document.getElementById("txtSearchOcult").click()
        }
        
    });
    }else{
        document.getElementById("loadPoke").style.display = "none"
        swal("¡Alerta!", "Debes escribir el nombre o colocar el ID de algun pokemon", "warning");
    }
}
// var habilidades = data.abilities.map(function (habilidades){
//     return habilidades.ability.name;
// })

// var movimientos = data.moves.map(function (movimientos){
//     return movimientos.move.name;
// })

// var types = data.types.map(function (types){
//     return types.type.name;
// })

// document.getElementById("txtHabilidades").value = habilidades
// document.getElementById("txtMovimientos").value = movimientos
// document.getElementById("imgPokemon").src = data.sprites.other.dream_world.front_default
// document.getElementById("txtTypes").value = types