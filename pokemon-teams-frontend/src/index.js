const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', ()=>{
fetchTeams()

})

function fetchTeams() {
  fetch(TRAINERS_URL)
  .then(r => r.json())
  .then(json => {
    json.forEach(team => {createObjects(team)})
  })
}

function createObjects(group) {
  let trainer = new Trainer(group.id, group.name)
  group.pokemons.forEach(pokemon=> {
    let poke = new Pokemon(pokemon.id, pokemon.nickname, pokemon.species, pokemon.trainer_id)
  })
  trainer.render()
}

function addPokemon(e){
  let trainerId = e.currentTarget.parentNode.id.split('-')[1]
  let pokemonTrainer = Trainer.findTrainer(parseInt(trainerId))
  if (pokemonTrainer.pokemons().length === 6){
    alert('You cant have more than 6 pokemons, release one')
    return
  }
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      trainer_id: pokemonTrainer.id
    })
  })
  .then(r => r.json())
  .then(pokemon => {
    new Pokemon(pokemon.id, pokemon.nickname, pokemon.species, pokemon.trainer_id)
    pokemonTrainer.updatePokemonList()
  })
}

function releasePokemon(e){
  let pokemonId = e.currentTarget.dataset.pokemonId
  let pokemon = Pokemon.findPokemon(parseInt(pokemonId))
  let pokemonTrainer = Trainer.findTrainer(parseInt(pokemon.trainer_id))
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
  .then(json => {
    pokemonTrainer.deletePokemon(json)
  })
}
