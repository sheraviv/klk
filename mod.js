function Pokemon(pokemonName, firstImg, secondImg) {
    this.pokemonName = pokemonName;
    this.firstImg = firstImg;
    this.secondImg = secondImg;
    this.id = `${pokemonName}-${generate()}`

}

function generate() {
    const some = Math.floor(Math.random() * 99999);
    return some;

}