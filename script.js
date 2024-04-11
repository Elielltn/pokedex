var myRequest = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];

const app = {
  buscarTodos: function (request) {
    fetch(request)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.results.length; i++) {
          app.buscarApenasUm(data.results[i].url);
        }
        if (data.next != null) {
          app.buscarTodos(data.next);
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
      });
  },
  criarNovoPokemon: function (pokemon) {
    if (pokemon.hasOwnProperty("pokeType2")) {
      return `
    <div class="grid-item">
            <div class="img-container">
              <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokeId}.png"
              alt=""
              class="item-img"
            />
            </div>
            <div class="item-details">
              <p class="number">Nº${pokemon.pokeId}</p>
              <p class="name">${pokemon.pokeName}</p>
              <div class="types">
                <p class="type1 ${pokemon.pokeType1}-type">${pokemon.pokeType1}</p>
                <p class="type2 ${pokemon.pokeType2}-type">${pokemon.pokeType2}</p>
              </div>
            </div>
          </div>
    `;
    } else {
      return `
    <div class="grid-item">
            <div class="img-container">
              <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokeId}.png"
              alt=""
              class="item-img"
            />
            </div>
            <div class="item-details">
              <p class="number">Nº${pokemon.pokeId}</p>
              <p class="name">${pokemon.pokeName}</p>
              <div class="types">
                <p class="type1 ${pokemon.pokeType1}-type">${pokemon.pokeType1}</p>
              </div>
            </div>
          </div>
    `;
    }
  },
  atualizarPokemons: function (arr) {
    let output = "";
    for (pokemon of arr) output = output + app.criarNovoPokemon(pokemon);

    document.querySelector(".grid").innerHTML = output;
  },
};

app.buscarTodos(myRequest);
app.atualizarPokemons(pokemons)