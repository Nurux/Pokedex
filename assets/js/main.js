const pokemonCard = document.querySelector('#pokemonlist')
const apresentation = document.querySelector('.apresentation')

const load = document.getElementById('more')
const firstGen = document.getElementById('1gen')
const secondtGen = document.getElementById('2gen')
const teertGen = document.getElementById('3gen')

const buttons = [firstGen, secondtGen, teertGen, load]
const dark = document.getElementById('darkmode')
const avatar = document.getElementById('perfil')
const page = document.querySelector('.pagination')
const body  = document.getElementsByTagName('body')[0]
const content = document.getElementsByTagName('section')[0]

const limit = 10
let offset = 0


function convertPokemonToHtml(pokemon) {
    return `
    <li class="pokemon ${pokemon.types[0]}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <img src="${pokemon.img}" alt="${pokemon.name}">
    </div>
</li>`
}

function loadPokemon(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHtlm = pokemons.map(convertPokemonToHtml).join('')
        pokemonCard.innerHTML += newHtlm
    })

    return true
}

function clearCanvas(x = false){
    if(x = true){
        apresentation.innerHTML = ' '
    }
    pokemonCard.innerHTML = ' '
    
}

function scrollPage(){
    window.scroll({
        top: document.querySelector('section').scrollHeight,
        behavior: 'smooth'
    })
}

// loadPokemon(offset, limit)

load.addEventListener('click', () => {
    if(offset === 0){
        clearCanvas(true)
        loadPokemon(offset, limit)
        scrollPage()
    }else{
        if(loadPokemon(offset, limit)){
            scrollPage()
        }
    }

    offset += limit    
})  

firstGen.addEventListener('click', () => {
    clearCanvas()
    loadPokemon(0, 151)
    offset = 151
})

secondtGen.addEventListener('click', () => {
    clearCanvas()
    loadPokemon(151, 251)
    offset = 251
})

teertGen.addEventListener('click', () => {
    clearCanvas()
    loadPokemon(251, 386)
    offset = 386
})

dark.addEventListener('click', () => {
    body.classList.toggle('dark')
    content.classList.toggle('dark_content')
    dark.classList.toggle('darkmode')
    page.classList.toggle('lightmode')
    avatar.classList.toggle('lightmode')
    avatar.classList.toggle('darkmode')

    for(i = 0; i < buttons.length; i++){
        buttons[i].classList.toggle('lightmode')
    }
    
})