const current_game = nodecg.Replicant('current_game', {defaultValue: 0});
const ad_settings = nodecg.Replicant('ad_settings', {defaultValue: {"visible": true}});
const overtime = nodecg.Replicant('overtime');
const game_max = nodecg.Replicant('game_max', {defaultValue: 3});
const game_state = nodecg.Replicant('game_state', {defaultValue: "unknown"});
const game_clock = nodecg.Replicant('game_clock', {defaultValue: "0:00"});
const left_team = nodecg.Replicant('left_team', {defaultValue: {
    "name": "Left Team",
    "player_names": [],
    "player_data": [],
    "games_won": 0,
    "games_lost": 0,
    "score": 0,
    "color": "#1873FF",
    "name_color": true,
    "digit_color": true
}});
const right_team = nodecg.Replicant('right_team', {defaultValue: {
    "name": "Right Team",
    "player_names": [],
    "player_data": [],
    "games_won": 0,
    "games_lost": 0,
    "score": 0,
    "color": "#F48D2E",
    "name_color": true,
    "digit_color": true
}});
const left_team_color = document.querySelector('#left_team_color');
const right_team_color = document.querySelector('#right_team_color');
const left_team_score = document.querySelector('#left_score');
const left_team_name = document.querySelector('#left_team_name');
const left_team_players = document.querySelector('#left_players');
const right_team_score = document.querySelector('#right_score');
const right_team_name = document.querySelector('#right_team_name');
const right_team_players = document.querySelector('#right_players');
const left_wins = document.querySelector('#left_wins');
const left_lost = document.querySelector('#left_lost');
const right_wins = document.querySelector('#right_wins');
const right_lost = document.querySelector('#right_lost');
const game_count = document.querySelector('#game_count');
const game_state_text = document.querySelector('#game_state');
const game_max_count = document.querySelector('#game_max_count');
const game_clock_text = document.querySelector('#game_clock');
const left_team_name_color = document.querySelector('#left_team_name_color');
const right_team_name_color = document.querySelector('#right_team_name_color');
const left_team_digit_color = document.querySelector('#left_team_digit_color');
const right_team_digit_color = document.querySelector('#right_team_digit_color');
const best_of_select = document.querySelector('#best_of_select');

function resetStats(){
    let text = "Are you sure you want to reset everything?";
    if (confirm(text) == true) {
        left_team.value = {
            "name": "Left Team",
            "player_names": [],
            "player_data": [],
            "games_won": 0,
            "games_lost": 0,
            "score": 0,
            "color": "#1873FF",
            "name_color": true, //true = white
            "digit_color": true //true = white
        };
        right_team.value = {
            "name": "Right Team",
            "player_names": [],
            "player_data": [],
            "games_won": 0,
            "games_lost": 0,
            "score": 0,
            "color": "#F48D2E",
            "name_color": true, //true = white
            "digit_color": true //true = white
        };
        games_count.value = 0;
        game_clock.value = "0:00";
        game_state.value = "unknown";
    }
}
function resetInGame(){
    let text = "Are you sure you want to reset in game stats (score and timer)?";
    if (confirm(text) == true) {
        game_clock.value = "0:00";
        left_team.value.player_names = [];
        left_team.value.player_data = [];
        left_team.value.score = 0;
        right_team.value.player_names = [];
        right_team.value.player_data = [];
        right_team.value.score = 0;
    }
}
function addGame(){
    if(game_max.value == 3){
        if(current_game.value < 4){
            current_game.value++;
        }
    }else{
        if(current_game.value < 6){
            current_game.value++;
        }
    }
}
function removeGame(){
    if(!(current_game.value < 1)){
        current_game.value--;
    }
}

function changeName(team){
    if(team == "left"){
        let name = prompt("Please enter a name: ");
        let text;
        if (name == null || name == "") {
            
        } else {
            text = name;
            left_team.value.name = text;
        }
        
    }else{
        let name = prompt("Please enter a name: ");
        let text;
        if (name == null || name == "") {
        } else {
            text = name;
            right_team.value.name = text;  
        }
        
    }
}

function addW(team){
    if(team == "left"){
        if(game_max.value == 3){
            if(left_team.value.games_won < 3){
                left_team.value.games_won++;
            }
        }else{
            if(left_team.value.games_won < 4){
                left_team.value.games_won++;
            }
        }
    }else{
        if(game_max.value == 3){
            if(right_team.value.games_won < 3){
                right_team.value.games_won++;
            }
        }else{
            if(right_team.value.games_won < 4){
                right_team.value.games_won++;
            }
        }   
    }
}
function addL(team){
    if(team == "left"){
        if(game_max.value == 3){
            if(left_team.value.games_lost < 3){
                left_team.value.games_lost++;
            }
        }else{
            if(left_team.value.games_lost < 4){
                left_team.value.games_lost++;
            }
        }
    }else{
        if(game_max.value == 3){
            if(right_team.value.games_lost < 3){
                right_team.value.games_lost++;
            }
        }else{
            if(right_team.value.games_lost < 4){
                right_team.value.games_lost++;
            }
        }     
    }
}
function delW(team){
    if(team == "left"){
        if(!(left_team.value.games_won < 1)){
            left_team.value.games_won--;
        }
    }else{
        if(!(right_team.value.games_won < 1)){
            right_team.value.games_won--;
        }   
    }
}
function delL(team){
    if(team == "left"){
        if(!(left_team.value.games_lost < 1)){
            left_team.value.games_lost--;
        }
    }else{
        if(!(right_team.value.games_lost < 1)){
            right_team.value.games_lost--;
        }   
    }
}
current_game.on('change', (newVal, oldValue) => {
    let gameNum = newVal+1;
	game_count.innerHTML = gameNum;
})
left_team.on('change', (newVal) => {
	left_team_score.innerHTML = newVal.score;
    left_team_name.innerHTML = newVal.name;
    left_team_name_color.setAttribute("checked", newVal.name_color);
    left_team_digit_color.setAttribute("checked", newVal.digit_color);
	left_wins.innerHTML = newVal.games_won;
    //left_lost.innerHTML = newVal.games_lost;
    left_team_players.innerHTML = newVal.player_names.join(", ");
})
right_team.on('change', (newVal) => {
	right_team_score.innerHTML = newVal.score;
    right_team_name.innerHTML = newVal.name;
    right_team_name_color.setAttribute("checked", newVal.name_color);
    right_team_digit_color.setAttribute("checked", newVal.digit_color);
    right_wins.innerHTML = newVal.games_won;
    //right_lost.innerHTML = newVal.games_lost;
    right_team_players.innerHTML = newVal.player_names.join(", ");
})
game_clock.on('change', (newVal) => {
    if(overtime.value){
        game_clock_text.classList.add("overtime");
        game_clock_text.innerHTML = "+"+newVal;
    }else{
        game_clock_text.classList.remove("overtime");
        game_clock_text.innerHTML = newVal;
    }
})
game_state.on('change', (newVal) => {
	game_state_text.innerHTML = newVal;
})
game_max.on('change', (newVal) => {
    if(newVal == 3){
        game_max_count.innerHTML = "5";
        best_of_select.checked = false;
    }else{
        game_max_count.innerHTML = "7";
        best_of_select.checked = true;
    }
})
function handleChange(cb) {
    if(cb.checked){
        game_max.value = 4;
    }else{
        game_max.value = 3;
    }
}
function handleColor(cb, team) {
    if(team == "left"){
        left_team.value.color = cb.value;
    }else{
        right_team.value.color = cb.value;
    }
}
function adToggle(cb){
    if(cb.checked){
        ad_settings.value.visible = true;
    }else{
        ad_settings.value.visible = false;
    } 
}
function textColorChange(cb, team){
    if(team == "left"){
        if(cb.checked){
            left_team.value.name_color = true;
        }else{
            left_team.value.name_color = false;
        }
    }else{
        if(cb.checked){
            right_team.value.name_color = true;
        }else{
            right_team.value.name_color = false;
        }
    }
}
function digitColorChange (cb, team){
    if(team == "left"){
        if(cb.checked){
            left_team.value.digit_color = true;
        }else{
            left_team.value.digit_color = false;
        }
    }else{
        if(cb.checked){
            right_team.value.digit_color = true;
        }else{
            right_team.value.digit_color = false;
        }
    }
}

nodecg.readReplicant('left_team', value => {
    left_team_color.value = value.color;
});
nodecg.readReplicant('right_team', value => {
    right_team_color.value = value.color;
});
nodecg.readReplicant('game_max', value => {
    if(value == 3){
        game_max_count.innerHTML = "5";
        best_of_select.checked = false;
    }else{
        game_max_count.innerHTML = "7";
        best_of_select.checked = true;
    }
});
ad_settings.on('change', (value) => {
    if(value.visible){
        ads_show.checked = true;
    }else{
        ads_show.checked = false;
    }
})

nodecg.readReplicant('ad_settings', value => {
    if(value.visible){
        ads_show.checked = true;
    }else{
        ads_show.checked = false;
    }
});