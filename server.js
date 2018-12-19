const fs = require('fs');
var pokemon = JSON.parse(fs.readFileSync('patch/pokemon.json'));
var pokedex = JSON.parse(fs.readFileSync('patch/pokedex.json'));
for(let index = 0 ; index<pokemon.length && index<pokedex.length ; index++){
    pokemon[index].base_stat = pokedex[index].base;
}
fs.writeFileSync('patch/pokemon.new.json' ,JSON.stringify(pokemon));