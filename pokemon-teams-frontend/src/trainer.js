let teams = {trainers: [], pokemons: []}

class Trainer{
  constructor(id, name){
    this.name = name
    this.id = id
    teams.trainers.push(this)
  }
  pokemons(){
    return teams.pokemons.filter(pokemon=>
      {return pokemon.trainer_id == this.id})
  }

  render(){
    let main = document.querySelector('main')
    let divCard = document.createElement('div')
    let p = document.createElement('p')
    let addBtn = document.createElement('button')
    let ul = document.createElement('ul')

    divCard.className = 'card'
    divCard.id = `card-${this.id}`
    p.innerText = this.name
    addBtn.innerText = 'Add Pokemon'
    addBtn.addEventListener('click', addPokemon)
    main.appendChild(divCard)
    divCard.append(p, addBtn, ul)

    this.pokemons().forEach(pokemon=> {
      let li = document.createElement('li')
      let releaseBtn = document.createElement('button')
      li.innerText = `${pokemon.nickname} / ${pokemon.species}`
      releaseBtn.className = 'release'
      releaseBtn.dataset.pokemonId = pokemon.id
      releaseBtn.innerText = 'Release'
      releaseBtn.addEventListener('click', releasePokemon)
      ul.appendChild(li)
      li.appendChild(releaseBtn)
    })
  }

  static findTrainer(id){
    return teams.trainers.find(trainer => {return trainer.id === id})
  }

  updatePokemonList(){
    let cardDiv = document.querySelector(`#card-${this.id}`)
    let ul = cardDiv.querySelector('ul')
    ul.innerHTML = ""

    this.pokemons().forEach(pokemon=> {
      let li = document.createElement('li')
      let releaseBtn = document.createElement('button')
      li.innerText = `${pokemon.nickname} / ${pokemon.species}`
      releaseBtn.className = 'release'
      releaseBtn.dataset.pokemonId = pokemon.id
      releaseBtn.innerText = 'Release'
      releaseBtn.addEventListener('click', releasePokemon)
      ul.appendChild(li)
      li.appendChild(releaseBtn)
    })
  }

  deletePokemon(pokemonX){
    let cardDiv = document.querySelector(`#card-${this.id}`)
    let ul = cardDiv.querySelector('ul')
    ul.innerHTML = ""
    let newPokemonList = []
    teams.pokemons.forEach(pokemon=>{
      if(pokemon.id !== pokemonX.id){
        newPokemonList.push(pokemon)
      }
    })
    teams.pokemons = newPokemonList
    this.pokemons().forEach(pokemon=> {
      let li = document.createElement('li')
      let releaseBtn = document.createElement('button')
      li.innerText = `${pokemon.nickname} / ${pokemon.species}`
      releaseBtn.className = 'release'
      releaseBtn.dataset.pokemonId = pokemon.id
      releaseBtn.innerText = 'Release'
      releaseBtn.addEventListener('click', releasePokemon)
      ul.appendChild(li)
      li.appendChild(releaseBtn)
    })
  }


}
