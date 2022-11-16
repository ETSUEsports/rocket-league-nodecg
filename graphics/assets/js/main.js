$(() => {
    const cg_left_team = nodecg.Replicant('left_team');
    const cg_right_team = nodecg.Replicant('right_team');
    const current_game = nodecg.Replicant('current_game');
    const game_clock = nodecg.Replicant('game_clock');
    const overtime = nodecg.Replicant('overtime', {defaultValue: false});
    const game_max = nodecg.Replicant('game_max', {defaultValue: 3});
    const left_team_score_card = nodecg.Replicant('assets:left_team_score_card');
    const right_team_score_card = nodecg.Replicant('assets:right_team_score_card');
    const replay_stats = nodecg.Replicant('replay_stats');

    nodecg.readReplicant('left_team_score_card', value => {
        if (typeof value !== 'undefined'){
            const url = value[0].url;
            document.getElementsByClassName('left_score_img')[0].style.backgroundImage=`url(${url})`;
        }
    });
    nodecg.readReplicant('right_team_score_card', value => {
        if (typeof value !== 'undefined'){
            const url = value[0].url;
            document.getElementsByClassName('right_score_img')[0].style.backgroundImage=`url(${url})`;
        }
    });
    console.log("Connecting to WebSocket");
    //WsSubscribers.init(window.location.hostname, 49322, true);
    WsSubscribers.init('localhost', 49322, true);
    WsSubscribers.subscribe("game", "update_state", (d) => {
        //On Update State event, send to NodeCG
        const game_data = d['game'];
        const teams = game_data['teams'];
        const players = d['players'];
        //Handle Player Names
        let left_team = [];
        let left_team_names = [];
        let right_team = [];
        let right_team_names = [];
        const focused_player = players[game_data['target']];
        for (const p in players) {
            if(players[p].team == 0){
                left_team.push(players[p]);
                left_team_names.push(players[p].name);
            }else{
                right_team.push(players[p]);
                right_team_names.push(players[p].name);
            }
        }
        if(focused_player && !game_data['isReplay']){
            $("#player_stats_container").css('visibility', 'visible');
            $("#player_stats_accent_bar").css('visibility', 'visible');
            $("#boost_circle").css('visibility', 'visible');
            $("#player_stats_name").text(truncateString(focused_player.name, 14));
            $("#player_stats_score").text(focused_player.score);
            $("#player_stats_goals").text(focused_player.goals);
            $("#player_stats_shots").text(focused_player.shots);
            $("#player_stats_asst").text(focused_player.assists);
            $("#player_stats_saves").text(focused_player.saves);
            boostGauge.setValueAnimated(focused_player.boost);

            if(focused_player.team == 0){
                $(`#gauge3`).addClass('blue');
                $(`#gauge3`).removeClass('orange');
                for(var i=0; i<left_team.length; i++){
                    if(left_team[i].id==focused_player.id){
                        $(`#team_0_player_${i+1}`).addClass('player_focused_left');
                        $(`#team_0_player_${i+1}_events`).addClass('player_focused_left');
                        $(`#team_1_player_${i+1}`).removeClass('player_focused_right');
                        $(`#team_1_player_${i+1}_events`).removeClass('player_focused_right');
                    }else{
                        $(`#team_0_player_${i+1}`).removeClass('player_focused_left');
                        $(`#team_1_player_${i+1}`).removeClass('player_focused_right');
                        $(`#team_0_player_${i+1}_events`).removeClass('player_focused_left');
                        $(`#team_1_player_${i+1}_events`).removeClass('player_focused_right');
                    }
                }
                $("#player_stats_container").addClass('left_team_stats');
                $("#player_stats_accent_bar").addClass('left_team_stats');
                $("#player_stats_container").removeClass('right_team_stats');
                $("#player_stats_accent_bar").removeClass('right_team_stats');
            }else{
                $(`#gauge3`).addClass('orange');
                $(`#gauge3`).removeClass('blue');
                for(var i=0; i<right_team.length; i++){
                    if(right_team[i].id==focused_player.id){
                        $(`#team_1_player_${i+1}`).addClass('player_focused_right');
                        $(`#team_1_player_${i+1}_events`).addClass('player_focused_right');
                        $(`#team_0_player_${i+1}`).removeClass('player_focused_left');
                        $(`#team_0_player_${i+1}_events`).removeClass('player_focused_left');
                    }else{
                        $(`#team_1_player_${i+1}`).removeClass('player_focused_right');
                        $(`#team_0_player_${i+1}`).removeClass('player_focused_left');
                        $(`#team_1_player_${i+1}_events`).removeClass('player_focused_right');
                        $(`#team_0_player_${i+1}_events`).removeClass('player_focused_left');
                    }
                }
                $("#player_stats_container").removeClass('left_team_stats');
                $("#player_stats_accent_bar").removeClass('left_team_stats');
                $("#player_stats_container").addClass('right_team_stats');
                $("#player_stats_accent_bar").addClass('right_team_stats');
            }
        }else{
            for(var i=0; i<right_team.length; i++){
                $(`#team_0_player_${i+1}`).removeClass('player_focused_left');
                $(`#team_1_player_${i+1}`).removeClass('player_focused_right');
            }
            $("#player_stats_container").css('visibility', 'hidden');
            $("#player_stats_accent_bar").css('visibility', 'hidden');
            $("#boost_circle").css('visibility', 'hidden');
        }
        //Convert Time from Seconds to MM:SS
        if(game_data['time_seconds'] > 1800){
            showModal("The game clock is longer than 30 minutes, there may be visual bugs in the overlay!");
        }
        const time = secondsToMS(game_data['time_seconds']);
        //Update Scores
        cg_left_team.value.score = teams[0]['score'];
        cg_right_team.value.score = teams[1]['score'];
        //Update time
        game_clock.value = time;
        //Set Player Names
        cg_left_team.value.player_names = left_team_names;
        cg_right_team.value.player_names = right_team_names;
        cg_left_team.value.player_data = left_team;
        cg_right_team.value.player_data = right_team;


        if(game_data['isOT']){
            overtime.value = true;
        }else{
            overtime.value = false;
        }
        if(game_data['hasWinner']){
            $("#player_stats_container").css('visibility', 'hidden');
            $("#player_stats_accent_bar").css('visibility', 'hidden');
            $("#boost_circle").css('visibility', 'hidden');
            $("#left_players_container").css('visibility', 'hidden');
            $("#right_players_container").css('visibility', 'hidden');
            $("#transition_img").attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
        }
    });

    current_game.on('change', (newVal) => {
        let gameNum = newVal+1;
        $("#game_id").text(gameNum);
    })
    left_team_score_card.on('change', (newVal) => {
        if (typeof newVal !== 'undefined'){
            const url = newVal[0].url;
            document.getElementsByClassName('left_score_img')[0].style.backgroundImage=`url(${url})`;
        }
    })
    right_team_score_card.on('change', (newVal) => {
        if (typeof newVal !== 'undefined'){
            const url = newVal[0].url;
            document.getElementsByClassName('right_score_img')[0].style.backgroundImage=`url(${url})`;
        }
    })

    replay_stats.on('change', (newVal) => {
        if(typeof newVal !== "undefined"){
            if(newVal.scorer.teamnum == 0){
                $("#replay_stats_team").text(`${cg_left_team.value.name.toLowerCase()} Goal`);
            }else{
                $("#replay_stats_team").text(`${cg_right_team.value.name.toLowerCase()} Goal`);
            }
            $("#replay_stats_name").text(truncateString(newVal.scorer.name, 12));
            if(newVal.assister.name){
                $("#replay_stats_asst").text(truncateString(newVal.assister.name), 18);
            }else{
                $("#replay_stats_asst_container").css('visibility', 'hidden');
            }
        }
    })

    game_max.on('change', (newVal) => {
        if(newVal == 3){
            $("#left_win_4").addClass('bo3');
            $("#right_win_4").addClass('bo3');
            $("#best_of_count").text(5);
        }else{
            $("#left_win_4").removeClass('bo3');
            $("#right_win_4").removeClass('bo3');
            $("#best_of_count").text(7);
        }
    })

    cg_left_team.on('change', (newVal) => {
        $("#left_team_score").text(newVal.score);
        $("#left_team_name").text(newVal.name.toLowerCase());
        $("#left_player_list").text(newVal.player_names.join(", "));
        $("#left_score_card").css('background-color', newVal.color);
        $(".left_score_card").css('background-color', newVal.color);
        $(".left_player_list").css('background-color', newVal.color);
        if(newVal.name_color){
            $("#left_team_name").addClass('white_text');
            $("#left_team_name").removeClass('black_text');
        }else{
            $("#left_team_name").removeClass('white_text');
            $("#left_team_name").addClass('black_text');
        }
        if(newVal.digit_color){
            $("#left_team_score").addClass('white_text');
            $("#left_team_score").removeClass('black_text');
            $("#left_player_list").addClass('white_text');
            $("#left_player_list").removeClass('black_text');
        }else{
            $("#left_team_score").removeClass('white_text');
            $("#left_team_score").addClass('black_text');
            $("#left_player_list").removeClass('white_text');
            $("#left_player_list").addClass('black_text');
        }
        if(newVal.games_won == 0){
            $("#left_win_1").addClass('win_hide');
            $("#left_win_2").addClass('win_hide');
            $("#left_win_3").addClass('win_hide');
            $("#left_win_4").addClass('win_hide');
        }else if(newVal.games_won == 1){
            $("#left_win_1").removeClass('win_hide');
            $("#left_win_2").addClass('win_hide');
            $("#left_win_3").addClass('win_hide');
            $("#left_win_4").addClass('win_hide');
        }else if(newVal.games_won == 2){
            $("#left_win_1").removeClass('win_hide');
            $("#left_win_2").removeClass('win_hide');
            $("#left_win_3").addClass('win_hide');
            $("#left_win_4").addClass('win_hide');
        }else if(newVal.games_won == 3){
            $("#left_win_1").removeClass('win_hide');
            $("#left_win_2").removeClass('win_hide');
            $("#left_win_3").removeClass('win_hide');
            $("#left_win_4").addClass('win_hide');
        }else if(newVal.games_won == 4){
            $("#left_win_1").removeClass('win_hide');
            $("#left_win_2").removeClass('win_hide');
            $("#left_win_3").removeClass('win_hide');
            $("#left_win_4").removeClass('win_hide');
        }
        const player_names = newVal.player_names;
        const player_data = newVal.player_data;
        for (const p in player_names) {
            const player_number = Number(p)+1;
            $(`#team_0_player_${player_number}`).attr('data-player', player_data[p].id);
            $(`#team_0_player_${player_number}_events`).attr('data-player', player_data[p].id);
            $(`#team_0_player_${player_number}_name`).text(truncateString(player_names[p], 18));
            $(`#team_0_player_${player_number}_boost`).text(player_data[p].boost);
            $(`#team_0_player_${player_number}_boost_bar`).width(`${player_data[p].boost}%`);
        } 
    })
    cg_right_team.on('change', (newVal) => {
        $("#right_team_score").text(newVal.score);
        $("#right_team_name").text(newVal.name.toLowerCase());
        $("#right_player_list").text(newVal.player_names.join(", "));
        $(".right_score_card").css('background-color', newVal.color);
        $(".right_player_list").css('background-color', newVal.color);
        if(newVal.name_color){
            $("#right_team_name").addClass('white_text');
            $("#right_team_name").removeClass('black_text');
        }else{
            $("#right_team_name").removeClass('white_text');
            $("#right_team_name").addClass('black_text');
        }
        if(newVal.digit_color){
            $("#right_team_score").addClass('white_text');
            $("#right_team_score").removeClass('black_text');
            $("#right_player_list").addClass('white_text');
            $("#right_player_list").removeClass('black_text');
        }else{
            $("#right_team_score").removeClass('white_text');
            $("#right_team_score").addClass('black_text');
            $("#right_player_list").removeClass('white_text');
            $("#right_player_list").addClass('black_text');
        }
        if(newVal.games_won == 0){
            $("#right_win_1").addClass('win_hide');
            $("#right_win_2").addClass('win_hide');
            $("#right_win_3").addClass('win_hide');
            $("#right_win_4").addClass('win_hide');
        }else if(newVal.games_won == 1){
            $("#right_win_1").removeClass('win_hide');
            $("#right_win_2").addClass('win_hide');
            $("#right_win_3").addClass('win_hide');
            $("#right_win_4").addClass('win_hide');
        }else if(newVal.games_won == 2){
            $("#right_win_1").removeClass('win_hide');
            $("#right_win_2").removeClass('win_hide');
            $("#right_win_3").addClass('win_hide');
            $("#right_win_4").addClass('win_hide');
        }else if(newVal.games_won == 3){
            $("#right_win_1").removeClass('win_hide');
            $("#right_win_2").removeClass('win_hide');
            $("#right_win_3").removeClass('win_hide');
            $("#right_win_4").addClass('win_hide');
        }else if(newVal.games_won == 4){
            $("#right_win_1").removeClass('win_hide');
            $("#right_win_2").removeClass('win_hide');
            $("#right_win_3").removeClass('win_hide');
            $("#right_win_4").removeClass('win_hide');
        }
        const player_names = newVal.player_names;
        const player_data = newVal.player_data;
        for (const p in player_names) {
            const player_number = Number(p)+1;
            $(`#team_1_player_${player_number}`).attr('data-player', player_data[p].id);
            $(`#team_1_player_${player_number}_events`).attr('data-player', player_data[p].id);
            $(`#team_1_player_${player_number}_name`).text(truncateString(player_names[p], 18));
            $(`#team_1_player_${player_number}_boost`).text(player_data[p].boost);
            $(`#team_1_player_${player_number}_boost_bar`).width(`${player_data[p].boost}%`);
        } 
    })
    game_clock.on('change', (newVal) => {
        if(overtime.value){
            $("#time_seconds").text(`+${newVal}`);
        }else{
            $("#time_seconds").text(newVal);
        }
    })
});

function secondsToMS(d) {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return m + ":" + ('0' + s).slice(-2);
}

function truncateString(string, limit) {
    if (string.length > limit) {
      return string.substring(0, limit) + "..."
    } else {
      return string
    }
}

function showModal(message) {
    $("#modal_msg").html(message);
    $('#error_modal').show();
}

function hideModal(){
    $('#error_modal').hide();
}