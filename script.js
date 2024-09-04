const grid = document.getElementById("grid");
const pokemonCount = 20;

const pokemons = [];

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemons(i);
  }
};

const getPokemons = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();

  // Extracting relevant data
  const pokeData = {
    id: data.id,
    pokeName: data.name,
    type1: data.types[0].type.name,
    type2: data.types[1]?.type.name || null, // Some Pokémon may not have a second type
  };

  // Add the data to the pokemons array
  pokemons.push(pokeData);

  // Update the grid with the fetched Pokémon's data
  updateGrid(pokeData);
};

const updateGrid = (pokeData) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.className = "grid-item";

  if (pokeData.type2 === null) {
    pokemonDiv.innerHTML = `
    <div class="img-container" id="img-container">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png"
              alt=""
              class="item-img"
              id="item-img"
            />
          </div>
          <div class="item-details" id="item-details">
            <p class="number" id="number">Nº${pokeData.id}</p>
            <p class="name" id="name">${pokeData.pokeName}</p>
            <div class="types" id="types">
              <p class="type1 ${pokeData.type1}-type" id="type1">${pokeData.type1.charAt(0).toUpperCase() + pokeData.type1.substring(1)}</p>

            </div>
          </div>
  `;
  } else {
    pokemonDiv.innerHTML = `
          <div class="img-container" id="img-container">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png"
              alt=""
              class="item-img"
              id="item-img"
            />
          </div>
          <div class="item-details" id="item-details">
            <p class="number" id="number">Nº${pokeData.id}</p>
            <p class="name" id="name">${pokeData.pokeName}</p>
            <div class="types" id="types">
              <p class="type1 ${pokeData.type1}-type" id="type1">${pokeData.type1.charAt(0).toUpperCase() + pokeData.type1.substring(1)}</p>
              <p class="type1 ${pokeData.type2}-type" id="type2">${pokeData.type2.charAt(0).toUpperCase() + pokeData.type2.substring(1)}</p>
            </div>
          </div>
    `
  ;
  }

  grid.appendChild(pokemonDiv);
};

fetchPokemons();

//  <p>ID: ${pokeData.id}</p>
//  <p>Name: ${pokeData.pokeName}</p>
//  <p>Type 1: ${pokeData.type1}</p>
//  <p>Type 2: ${pokeData.type2 || "None"}</p>
