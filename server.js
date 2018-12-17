const pokemons = require('./patch/pokemon.js').pokemon;
//const types = require('./patch/pokemon-detail.js');
var fs = require('fs');

var pokemon = pokemons.results.slice(0,151);//1-151 ตัวแรก
//console.log(pokemon[150]); 
//console.log(types.typesTable.results);
/*types.result.forEach(element => {
    console.log(element);
});*/
var basic_type = JSON.parse(fs.readFileSync("patch/type-table.json","utf-8")).type;
console.log(basic_type);

// create tab_element_type;
//console.log(basic_type);
var type_detail= [];
let index = 0;
/*types.typesTable.results.forEach(
    element =>{
        type_detail[index] = [];
        for(let e = 0 ; e<18 ; e++){
            type_detail[index][e] = 1;       
        }
        element.immunes.forEach( immune =>{type_detail[index][basic_type.indexOf(immune)] = 0});
        element.weaknesses.forEach( weakness =>{type_detail[index][basic_type.indexOf(weakness)] = 0.5});
        element.strengths.forEach( strength =>{type_detail[index][basic_type.indexOf(strength)] = 2});
        index++;
    }
);*/
var obj;
//console.log(pokemons.results.length);
fs.readFile(__dirname+'/patch/pokemon-with-type.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    for(let i = 0 ;i<pokemon.length ; i++){
        pokemon[i].types = [];
        obj[i].types.forEach(element =>{
            pokemon[i].types.push(basic_type.indexOf(element));
        })
    }
    console.log(pokemon.slice(0,10));
    fs.writeFileSync("patch/pokemon.json",JSON.stringify(pokemon),"utf-8" );
});