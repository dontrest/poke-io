const fs = require('fs');
var maps = JSON.parse(fs.readFileSync("patch/maps.json","utf-8"));
var pokemon = JSON.parse(fs.readFileSync("patch/pokemon.json" , "utf-8"));
maps.forEach(map => {
    initMap(map);
    console.log(map);
});
var last_time = new Date().getMilliseconds();
/*while(true){
    let alpha = new Date().getMilliseconds()-last_time; 
    last_time = new Date().getMilliseconds();
    for(let i = 0 ; i<maps.length ;i++){
        
    }
}*/

function initMap(map){
    map.enemy = [];
    map.people = 0;
    map.npc=[];
    for(let i = 0 ; i < map.spawn.length ; i++){
        let spawn = map.spawn[i];
        //console.log(spawn);
        for(let spawnnum = 0 ; spawnnum < spawn.max ;spawnnum++){
            let enemy = {
                "type":spawn.type,
                "id" : spawn.id,
                "name" : spawn.type === "pokemon"? pokemon[spawn.id].name :null
            }
            enemy.brain = {"event" : "wait", "duration": Math.round(Math.random()*1000+1000)}
            enemy.status = 0;
            enemy.x = Math.round(((Math.random()) * (spawn.area[1]-spawn.area[0])) +spawn.area[0]); 
            enemy.y = Math.round(Math.random() * map.height);
            map.enemy.push(enemy);
        }    
    }
}