const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerList = document.querySelector('main')



function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => renderTrainers(trainers))
}

function renderTrainers(trainers){
    trainers.forEach(trainer => {
        const trainerCard = buildTrainer(trainer)
        trainerList.insertAdjacentHTML('beforeend', trainerCard)
    
    })
}

function buildTrainer(trainer){
    const trainerHTML = `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p> <button class="add" data-trainer-id=${trainer.id}>Add Pokemon</button><ul>${renderPokemons(trainer.pokemons)}</ul></div>`
    return trainerHTML
}

function renderPokemons(pokemons){   
    let pokemonString = ""
    pokemons.forEach(pokemon => {
        pokemonString += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    })
return pokemonString
}

function renderPokemon(pokemon){
    newPokemon = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
    pokemonList = document.querySelector(`[data-id="${pokemon.trainer_id}"]`).children[2]
    pokemonList.insertAdjacentHTML('beforeend', newPokemon)
}


trainerList.addEventListener("click", function(event){
    if (event.target.className === "add" && event.target.nextElementSibling.children.length < 6){
        addPokemon(event.target)    
    }
    else if (event.target.className === "release"){
        releasePokemon(event.target)
    }
})

function addPokemon(eventTarget){
    let configObj = () =>{
        return {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body : JSON.stringify({
                trainer_id: `${eventTarget.dataset.trainerId}`
            })
        }

    }
return fetch(POKEMONS_URL, configObj())
        .then (resp => resp.json())
        .then (newPokemon => renderPokemon(newPokemon))

}

function releasePokemon(eventTarget){
    console.log(eventTarget)
}



function main(){
    fetchTrainers()
}

document.addEventListener("DOMContentLoaded", (event) => {
main()
})