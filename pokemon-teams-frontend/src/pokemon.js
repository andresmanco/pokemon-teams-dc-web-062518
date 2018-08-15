class Pokemon {
  constructor(id, nickname, species, trainer_id){
    this.id = id
    this.nickname = nickname
    this.species = species
    this.trainer_id = trainer_id
    teams.pokemons.push(this)
  }
  trainer(){
    return teams.trainers.find((trainer)=>{return trainer.id == this.trainer_id})
  }

  static findPokemon(id){
    return teams.pokemons.find(pokemon => {return pokemon.id === id})
  }

}
