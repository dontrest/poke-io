const fs = require('fs');
var maps = fs.readFileSync("patch/maps.json","uft-8");

maps.array.forEach(map => {
    initMap(map);
});
var last_time = new Date().getMilliseconds();
while(true){
    let alpha = new Date().getMilliseconds()-last_time; 
    last_time = new Date().getMilliseconds();
    for(let i = 0 ; i<maps.length ;i++){
        
    }
}

function initMap(map){
    map.enemy = [];
    map.people = 0;
    map.npc=[];
}