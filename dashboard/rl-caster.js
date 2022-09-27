const current_game = nodecg.Replicant('current_game');
const game_state = nodecg.Replicant('game_state');
const game_clock = nodecg.Replicant('game_clock');
const left_team = nodecg.Replicant('left_team');
const right_team = nodecg.Replicant('right_team');

const left_team_score = document.querySelector('#left_score');
const left_team_players = document.querySelector('#left_players');
const right_team_score = document.querySelector('#right_score');
const right_team_players = document.querySelector('#right_players');
const left_wins = document.querySelector('#left_wins');
const left_lost = document.querySelector('#left_lost');
const right_wins = document.querySelector('#right_wins');
const right_lost = document.querySelector('#right_lost');
const game_count = document.querySelector('#game_count');
const game_clock_text = document.querySelector('#game_clock');
const game_state_text = document.querySelector('#game_state');

current_game.on('change', (newVal, oldValue) => {
    let gameNum = newVal+1;
	game_count.innerHTML = gameNum;
})

left_team.on('change', (newVal) => {
	left_team_score.innerHTML = newVal.score;
	left_wins.innerHTML = newVal.games_won;
    left_lost.innerHTML = newVal.games_lost;
    left_team_players.innerHTML = newVal.player_names.join(", ");
})
right_team.on('change', (newVal) => {
	right_team_score.innerHTML = newVal.score;
    right_wins.innerHTML = newVal.games_won;
    right_lost.innerHTML = newVal.games_lost;
    right_team_players.innerHTML = newVal.player_names.join(", ");
})
game_clock.on('change', (newVal) => {
	game_clock_text.innerHTML = newVal;
})
game_state.on('change', (newVal) => {
	game_state_text.innerHTML = newVal;
    const date = new Date().toLocaleString();
    const table = document.getElementById("play_by_play_table");
    let row = table.insertRow(1);
    var time = row.insertCell(0);
    var type = row.insertCell(1);
    var desc = row.insertCell(2);
    time.innerHTML = date;
    type.innerHTML = newVal;
    desc.innerHTML = "future";
})