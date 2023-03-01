
const PokeApi = {}

function convertPokeApiToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.order
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.types = types
    pokemon.type = types[0]
    pokemon.img = pokeDetail.sprites.versions['generation-v']['black-white'].animated.front_default

    return pokemon
}

PokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((resp) => resp.json())
            .then(convertPokeApiToPokemon)
}

PokeApi.getPokemons = (offset = 0, limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((res) => res.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((erro) => console.error(erro))
}