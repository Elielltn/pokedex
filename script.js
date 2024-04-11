var myRequest = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];
let urlTodos = [];
const app = {
  buscarTodos: function (request) {
    fetch(request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.next != null) {
          app.buscarTodos(data.next);
          for (let i = 0; i < data.results.length; i++) {
            urlTodos.push(data.results[i].url);
            // app.buscarApenasUm(data.results[i].url);
          }
        } else {
          urlTodos.forEach((element) => {
            app.buscarApenasUm(element);
          });
        }
      });
  },
  buscarApenasUm: function (request) {
    fetch(request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.types.length < 2) {
          pokemons.push({
            pokeId: data.id,
            pokeName: data.name,
            pokeType1: data.types[0].type.name,
          });
        } else {
          pokemons.push({
            pokeId: data.id,
            pokeName: data.name,
            pokeType1: data.types[0].type.name,
            pokeType2: data.types[1].type.name,
          });
        }
      })
      .then(function () {
        app.atualizarPokemons(pokemons);
      });
  },
  criarNovoPokemon: function (pokemon) {
    if (pokemon.pokeId > 10000) {
      return undefined;
    } else if (pokemon.hasOwnProperty("pokeType2")) {
      return `
    <div class="grid-item">
            <div class="img-container">
              <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemon.pokeId
              }.png"
              alt=""
              class="item-img"
            />
            </div>
            <div class="item-details">
              <p class="number">Nº${pokemon.pokeId}</p>
              <p class="name">${
                pokemon.pokeName.charAt(0).toUpperCase() +
                pokemon.pokeName.substring(1)
              }</p>
              <div class="types">
                <p class="type1 ${pokemon.pokeType1}-type">${
        pokemon.pokeType1.charAt(0).toUpperCase() +
        pokemon.pokeType1.substring(1)
      }</p>
                <p class="type2 ${pokemon.pokeType2}-type">${
        pokemon.pokeType2.charAt(0).toUpperCase() +
        pokemon.pokeType2.substring(1)
      }</p>
              </div>
            </div>
          </div>
    `;
    } else {
      return `
    <div class="grid-item">
            <div class="img-container">
              <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                pokemon.pokeId
              }.png"
              alt=""
              class="item-img"
            />
            </div>
            <div class="item-details">
              <p class="number">Nº${pokemon.pokeId}</p>
              <p class="name">${
                pokemon.pokeName.charAt(0).toUpperCase() +
                pokemon.pokeName.substring(1)
              }</p>
              <div class="types">
              <p class="type1 ${pokemon.pokeType1}-type">${
        pokemon.pokeType1.charAt(0).toUpperCase() +
        pokemon.pokeType1.substring(1)
      }</p>
              </div>
            </div>
          </div>
    `;
    }
  },
  atualizarPokemons: function (arr) {
    let output = "";
    for (pokemon of arr) {
      if (app.criarNovoPokemon(pokemon) === undefined) {
        output = output;
        break;
      }
      output = output + app.criarNovoPokemon(pokemon);
    }

    document.querySelector(".grid").innerHTML = output;
  },
};

app.buscarTodos(myRequest);
