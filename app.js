const fs = require('fs');
var io = require('socket.io')(9999);

var session_token = [{}];

io.sockets.on('connection', function(socket){
    console.log('a user connected');
    socket.on('connection' , data=>{
        
    });

    socket.on('choose_char' , data=>{
        
    });

    socket.on('disconnect', function() {
        console.log('Got disconnect!');


    });
});

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
    map.player = [];
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
            enemy.x = Math.floor(((Math.random()) * (spawn.area[1]-spawn.area[0])) +spawn.area[0]); 
            enemy.y = Math.floor(Math.random() * map.height);
            enemy.direction = Math.floor(Math.random() * 2);
            map.enemy.push(enemy);
        }
    }
}

