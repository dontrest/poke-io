const fs = require('fs');
var io = require('socket.io')(9999);

var session_token = [{}];
const coor =[
    [1,0],
    [0.5,0.5],
    [0,1],
    [-0.5,0.5],
    [-1,0],
    [-0.5,-0.5],
    [0,-1],
    [0.5,-0.5]
];
io.sockets.on('connection', function(socket){
    console.log('a user connected');
    socket.on('connection' , data=>{
        
    });
    socket.on('authen' ,data=>{

    });
    socket.on('choose_char' , data=>{
        
    });

    socket.on('disconnect', function() {
        console.log('Got disconnect!');


    });
});

var maps = JSON.parse(fs.readFileSync("patch/maps.json","utf-8"));
var pokemon = JSON.parse(fs.readFileSync("patch/pokemon.json" , "utf-8"));
for(let m = 0 ; m< maps.length ; m++){
    initMap(maps[m]);
    console.log(maps[m]);
}
// maps.forEach(map => {
//     initMap(map);
//     console.log(map);
// });
var last_time = new Date().getMilliseconds();
var last_nano_time = process.hrtime();
console.log(last_nano_time);
while(true){
    let alpha = new Date().getMilliseconds()-last_time;
    //console.log('alpha = '+alpha)
    last_time = new Date().getMilliseconds();
    for(let i = 0 ; i<maps.length ;i++){
        //for activity
        let map = maps[i];
        let enemy = map.enemy;
        for(var en_index=0 ; en_index<enemy.length ; en_index++){
            let en=enemy[en_index];
            switch(en.brain.event){
                case 'wait' :
                    en.brain.duration -= alpha; // decrease duration with alpha if duration equal or less than 0 change event
                    if(en.brain.duration<=0){
                        let ran_event = Math.round(Math.random()*2);// random 0,1 [0=wait][1=move]
                        if(ran_event){
                            en.brain = {"event" : "wait", "duration": Math.round(Math.random()*1000+1000)}
                            en.direction = en.direction ? 0 : 1;
                        }else{
                            // newX = oldX (+ or -) 5-15
                            en.brain = {"event" : "move", 
                                "position": {
                                    "x" : en.x,
                                    "y" : en.y,
                                    "d" : Math.floor(Math.random()*8),
                                    "r" : Math.floor(Math.random()*7+1)*2,
                                    "s" : 100
                                },
                                "duration" :  100
                            }
                        }
                    }
                break ;
                case 'move' :
                    let d = en.brain.duration - alpha;
                    if(d<=0){
                        let round_walk = 1+ Math.floor(Math.abs(d)/100);
                        en.brain.duration = Math.abs(d)%100;
                        let loop_walk = 0 ;
                        while(loop_walk < round_walk){
                            loop_walk++;
                            if(en.brain.position.r != 0){
                                en.brain.position.r-=0.1;
                                en.x+= Number((round_walk*0.1 *coor[en.brain.position.d][0]).toFixed(1));
                                en.y+= Number((round_walk*0.1 *coor[en.brain.position.d][1]).toFixed(1));
                                en.direction = en.x >en.brain.possition.x ? 1 : 0;
                            }else{
                                en.brain = {"event" : "wait", "duration": Math.round(Math.random()*1000+1000)}
                                en.direction = en.direction ? 0 : 1;
                                loop_walk=round_walk;
                            }
                        }
                    }else{
                        en.brain.duration = d;
                    }
                break;
            }
        }
        console.log(enemy);
    }
}

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
            // enemy.brain = {"event" : "wait", "duration": Math.round(Math.random()*1000+1000)}
            enemy.brain = {"event" : "wait", "duration": Math.round(Math.random()*10)}// down wait time for test
            enemy.status = 0;
            enemy.x = Math.floor(((Math.random()) * (spawn.area[1]-spawn.area[0])) +spawn.area[0]); 
            enemy.y = Math.floor(Math.random() * map.height);
            enemy.direction = Math.floor(Math.random() * 2);
            map.enemy.push(enemy);
        }
    }
}

