const DOM = {
    searchButton: null,
    searchInput: null,
    pokemonCard: null,
    alertModal: null,
}


const POKEMON_API = `https://pokeapi.co/api/v2/pokemon`


const state = { pokemons : []}

function init() {
    DOM.searchButton = document.querySelector("#searchButton");
    DOM.searchInput = document.querySelector("#searchInput");
    DOM.pokemonCard = document.querySelector("#content");
    DOM.alertModal = document.querySelector("#alertModal");

    DOM.searchButton.addEventListener("click", searchAction)


    draw(state.pokemons)
}

function draw(pokemons) {
    clearDOMContent();
    for (let index = 0; index < pokemons.length; index++) {
        const pokemonIcon = getCard(pokemons[index]);
        DOM.pokemonCard.append(pokemonIcon);
        
    }
}


function searchAction() {
    const value = DOM.searchInput.value
  
    if (!value) return;
    fetch(`${POKEMON_API}/${value}`)
    .then(_setJsonResponse)
    .then(_setPokemonsResponse)
    .catch(_setError)

    function _setJsonResponse(response) {
        return response.json()
    }
    function _setPokemonsResponse(response) {
        const pokemonName = response.name;
        const firstImg = response.sprites.front_default;
        const secondImg = response.sprites.back_default;
        const pokemon = new Pokemon (pokemonName, firstImg, secondImg);
        state.pokemons.push(pokemon);
        draw(state.pokemons)
    }

    function _setError(error) { 
        if (DOM.alertModal) {
            DOM.alertModal.style.visibility = "visible"
            setTimeout(function () {
                DOM.alertModal.style.visibility = "hidden"
            }, 5000)
        }
    }

}

init()






// its not working and i dont know WHY!?!?!?!?!?
// function draw() {
//   const cards = state.pokemons.map(function (m) {
//       return getCard(m)
//   }, {})
//   clearDOMContent()
//   DOM.pokemonCard.append(...cards) 
// }

function clearDOMContent() {
    DOM.pokemonCard.innerHTML = ""
}

function getCard(pokemon) {

    // front
    const mainDiv = document.createElement("div");
    mainDiv.classList.add("card");
    mainDiv.classList.add("flip-card");
   
    const secondaryDiv = document.createElement("div")
    secondaryDiv.className = "flip-card-inner";

    const thirdDiv = document.createElement("div");
    thirdDiv.className = "flip-card-front";


    const header = document.createElement("h5")
    header.className = "card-title"
    header.innerText = pokemon.pokemonName;

    const firstImage = document.createElement("img");
    firstImage.src = pokemon.firstImg;
 
    // back
    const backDiv = document.createElement("div");
    backDiv.className = "flip-card-back";
    

    const secondImg = document.createElement("img");
    secondImg.src = pokemon.secondImg;

    thirdDiv.append(header, firstImage);
     backDiv.append(secondImg);
     mainDiv.append(secondaryDiv);
    secondaryDiv.append(thirdDiv, backDiv);

    
    
    return mainDiv
}



