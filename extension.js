'use strict';

module.exports = function (nodecg) {
	const current_game = nodecg.Replicant('current_game');
	const left_team = nodecg.Replicant('left_team');
	const right_team = nodecg.Replicant('right_team');
    const router = nodecg.Router();
	const game_max = nodecg.Replicant('game_max');

    router.post('/team/:team/score/add', (req, res, error) => {
		try{
			if(req.params.team == "left"){
				if(game_max.value == 3){
					if(left_team.value.games_won < 3){
						left_team.value.games_won++;
					}else{
						throw new Error("Value cannot exceed 3.");
					}
				}else{
					if(left_team.value.games_won < 4){
						left_team.value.games_won++;
					}else{
						throw new Error("Value cannot exceed 4.");
					}
				}
			}else if(req.params.team == "right"){
				if(game_max.value == 3){
					if(right_team.value.games_won < 3){
						right_team.value.games_won++;
					}else{
						throw new Error("Value cannot exceed 3.");
					}
				}else{
					if(right_team.value.games_won < 4){
						right_team.value.games_won++;
					}else{
						throw new Error("Value cannot exceed 4.");
					}
				}   
			}else{
				throw new Error("Unknown team.")
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
    router.post('/team/:team/score/del', (req, res) => {
		try{
			if(req.params.team == "left"){
				if(!(left_team.value.games_won < 1)){
					left_team.value.games_won--;
				}else{
					throw new Error("Value cannot be lower than 0.");
				}
			}else if(req.params.team == "right"){
				if(!(right_team.value.games_won < 1)){
					right_team.value.games_won--;
				}else{
					throw new Error("Value cannot be lower than 0.");
				}
			}else{
				throw new Error("Unknown team.");
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
    router.post('/game/number/add', (req, res) => {
		try{
			if(game_max.value == 3){
				if(current_game.value < 4){
					current_game.value++;
				}else{
					throw new Error("Value cannot exceed 5.");
				}
			}else{
				if(current_game.value < 6){
					current_game.value++;
				}else{
					throw new Error("Value cannot exceed 7.");
				}
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
	router.post('/game/number/del', (req, res) => {
		try{
			if(!(current_game.value < 1)){
				current_game.value--;
			}else{
				throw new Error("Value cannot be lower than 0.");
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
    nodecg.mount('/etsu-rl', router);
};