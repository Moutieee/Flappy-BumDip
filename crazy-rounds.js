/* Random mini-rounds use gameplay time, so pausing and captures freeze every timer. */
(function(root){
const MODES=[
{id:'moon',name:'MOON BOOTS',icon:'🌙',hint:'Floaty jumps. Same controls.',duration:9,gravity:.65,jump:.8},
{id:'tiny',name:'PEERIE BUMDIP',icon:'🤏',hint:'Pocket-sized pilot. Smaller hitbox!',duration:9,scale:.65},
{id:'stash',name:'STASH JACKPOT',icon:'🎰',hint:'Every pickup counts triple!',duration:9,loot:3},
{id:'bubble',name:'BWA-BBLE WRAP',icon:'🫧',hint:'One free bonk. Bubble has your back.',duration:10,shield:true},
{id:'ufo',name:'ALIEN TAKEAWAY',icon:'🛸',hint:'UFO party! Pickups come to you.',duration:9,magnet:true},
{id:'munchies',name:'MUNCHIES MAYHEM',icon:'🍔',hint:'Mixed-up obstacles. New gates open wider!',duration:10,wide:true}
];
function create(random=Math.random){let active=null,pending=null,warning=0,left=0,nextGate=4+Math.floor(random()*3),last='',used=false,count=0;
function pick(){const choices=MODES.filter(m=>m.id!==last);pending=choices[Math.floor(random()*choices.length)];warning=1.7}
return {reset(){active=pending=null;warning=left=0;nextGate=4+Math.floor(random()*3);last='';used=false;count=0},
update(dt,score){if(pending){warning=Math.max(0,warning-dt);if(!warning){active=pending;pending=null;left=active.duration;last=active.id;used=false;count++}return}if(active){left=Math.max(0,left-dt);if(!left){active=null;nextGate=score+4+Math.floor(random()*5)}return}if(score>=nextGate)pick()},
get active(){return active},get pending(){return pending},get left(){return left},get warning(){return warning},get count(){return count},get shield(){return !!active?.shield&&!used},consumeShield(){if(!active?.shield||used)return false;used=true;return true},
get gravity(){return active?.gravity||1},get jump(){return active?.jump||1},get scale(){return active?.scale||1},get loot(){return active?.loot||1},get magnet(){return !!active?.magnet},get wide(){return !!active?.wide}
}}
root.BumdipCrazyRounds={MODES,create,rollBonus:(random=Math.random)=>Math.floor(random()*25)===0};
})(typeof globalThis==='undefined'?window:globalThis);
