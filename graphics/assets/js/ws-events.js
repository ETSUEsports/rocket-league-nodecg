$(() => {
    const game_state = nodecg.Replicant('game_state');
    const replay_stats = nodecg.Replicant('replay_stats');
    WsSubscribers.subscribe("game", "replay_start", (d) => { //On Replay Start event, update HTML Elements
        console.log(`Event: game:replay_start`);
        game_state.value = "Replay Started";
    });
    WsSubscribers.subscribe("game", "replay_end", (d) => { //On Replay End event, update HTML Elements
        console.log(`Event: game:replay_end`);
        game_state.value = "Replay End";
        $("#transition_img").attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
        $("#replay_stats_container").css('visibility', 'visible');
        $("#replay_stats_asst_container").css('visibility', 'visible');
        $("#left_players_container").css('visibility', 'hidden');
        $("#right_players_container").css('visibility', 'hidden');
        $("#boost_circle").css('visibility', 'hidden');
        $("#score_container").css('visibility', 'hidden');
        $("#main_container").addClass('replay_active');
    });
    WsSubscribers.subscribe("game", "goal_scored", (d) => { //On Goal Scored event, update HTML Elements
        console.log(`Event: game:goal_scored`);
        window.REPLAY_STATS = d;
        replay_stats.value = d;
        game_state.value = "Goal Scored";
        const game_time = 2500;
        $("#player_stats_container").css('visibility', 'hidden');
        $("#player_stats_accent_bar").css('visibility', 'hidden');
        $("#ads_container").css('visibility', 'hidden');
        $("#boost_circle").css('visibility', 'hidden');
        for (let i = 0; i < 3; i++) {
            const player_number = Number(i)+1;
            $(`#team_0_player_${player_number}_events`).css('visibility', 'hidden');
            $(`#team_0_player_${player_number}_events`).removeClass('player_focused_left');
            $(`#team_1_player_${player_number}_events`).css('visibility', 'hidden');
            $(`#team_1_player_${player_number}_events`).removeClass('player_focused_right');
        } 
        setTimeout(function() {
            if(d.scorer.teamnum == 0){
                $("#transition_img").attr('src', './assets/img/stinger_blue.gif');
            }else{
                $("#transition_img").attr('src', './assets/img/stinger_yellow.gif');
            }  
            const gif_time = 1650;
            const elements_time = 1000;
            setTimeout(function() {

                if(!d.assister.name){
                    $("#replay_stats_asst_container").css('visibility', 'hidden');
                }else{
                    $("#replay_stats_asst_container").css('visibility', 'visible');
                }
                $("#replay_stats_container").css('visibility', 'visible');
                $("#left_players_container").css('visibility', 'hidden');
                $("#right_players_container").css('visibility', 'hidden');
                $("#boost_circle").css('visibility', 'hidden');
                $("#score_container").css('visibility', 'hidden');
                $("#main_container").addClass('replay_active');
            }, elements_time);

            setTimeout(function() {
                $("#transition_img").attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
                $("#replay_stats_container").css('visibility', 'visible');
                $("#replay_stats_asst_container").css('visibility', 'visible');
                $("#left_players_container").css('visibility', 'hidden');
                $("#right_players_container").css('visibility', 'hidden');
                $("#boost_circle").css('visibility', 'hidden');
                $("#score_container").css('visibility', 'hidden');
                $("#main_container").addClass('replay_active');
            }, gif_time);
        }, game_time);
    });
    WsSubscribers.subscribe("game", "match_created", (d) => { //On Match Created event, update HTML Elements
        console.log(`Event: game:match_created`);
        hideModal();
        game_state.value = "Match Created";
        $("#blue_team").removeClass('game_over');
        $("#orange_team").removeClass('game_over');
        $("#game_clock").removeClass('game_over');
        $("#left_players_container").removeClass('game_over');
        $("#right_players_container").removeClass('game_over');
        $("#boost_circle").css('visibility', 'hidden');
        $("#main_container").css('visibility', 'visible');
        $("#replay_stats_container").css('visibility', 'hidden');
        $("#replay_stats_asst_container").css('visibility', 'hidden');
        $("#main_container").removeClass('replay_active');
        $("#left_players_container").css('visibility', 'visible');
        $("#right_players_container").css('visibility', 'visible');
        $("#score_container").css('visibility', 'visible');
        $("#ads_container").css('visibility', 'visible');
        $("#boost_circle").css('visibility', 'hidden');
    });
    WsSubscribers.subscribe("game", "initialized", (d) => { //On Initialized event, update HTML Elements
        console.log(`Event: game:initialized`);
        game_state.value = "Game Initialized";
    });
    WsSubscribers.subscribe("game", "pre_countdown_begin", (d) => { //On Pre Countdown event, update HTML Elements
        console.log(`Event: game:pre_countdown_begin`);
        game_state.value = "Pre Countdown Start";
        $("#main_container").css('visibility', 'visible');
        $("#replay_stats_container").css('visibility', 'hidden');
        $("#replay_stats_asst_container").css('visibility', 'hidden');
        $("#main_container").removeClass('replay_active');
        $("#left_players_container").css('visibility', 'visible');
        $("#right_players_container").css('visibility', 'visible');
        $("#score_container").css('visibility', 'visible');
        $("#ads_container").css('visibility', 'visible');
        $("#boost_circle").css('visibility', 'hidden');
    });
    WsSubscribers.subscribe("game", "post_countdown_begin", (d) => { //On Post Countdown event, update HTML Elements
        console.log(`Event: game:post_countdown_begin`);
        game_state.value = "Countdown Start";
    });
    WsSubscribers.subscribe("game", "round_started_go", (d) => { //On Round Started event, update HTML Elements
        console.log(`Event: game:round_started_go`);
        game_state.value = "Round Started";
    });
    WsSubscribers.subscribe("game", "ball_hit", (d) => { //On Ball Hit event, update HTML Elements
        console.log(`Event: game:ball_hit`);
    });
    WsSubscribers.subscribe("game", "clock_started", (d) => { //On Clock Started event, update HTML Elements
        console.log(`Event: game:clock_started`);
        game_state.value = "Game Clock Started (Ball Touched)";
    });
    WsSubscribers.subscribe("game", "clock_stopped", (d) => { //On Clock Stop event, update HTML Elements
        console.log(`Event: game:clock_stopped`);
        game_state.value = "Game Clock Stopped";
    });
    WsSubscribers.subscribe("game", "match_ended", (d) => { //On Match End event, update HTML Elements
        console.log(`Event: game: match_ended`);
        game_state.value = "Match Ended";
        $("#blue_team").addClass('game_over');
        $("#orange_team").addClass('game_over');
        $("#game_clock").addClass('game_over');
        $("#left_players_container").addClass('game_over');
        $("#right_players_container").addClass('game_over');
    });
    WsSubscribers.subscribe("game", "podium_start", (d) => { //On Podium Start event, update HTML Elements
        console.log(`Event: game: podium_start`);
        $("#blue_team").addClass('game_over');
        $("#orange_team").addClass('game_over');
        $("#game_clock").addClass('game_over');
        $("#left_players_container").addClass('game_over');
        $("#right_players_container").addClass('game_over');
        game_state.value = "Podium Started";
    });
    WsSubscribers.subscribe("game", "match_destroyed", (d) => { //On Match Destroyed event, update HTML Elements
        console.log(`Event: game: match_destroyed`);
        hideModal();
        game_state.value = "Match Destroyed";
        $("#main_container").css('visibility', 'hidden');
        $("#replay_stats_container").css('visibility', 'hidden');
        $("#replay_stats_asst_container").css('visibility', 'hidden');
        $("#main_container").removeClass('replay_active');
        $("#left_players_container").css('visibility', 'hidden');
        $("#right_players_container").css('visibility', 'hidden');
        $("#score_container").css('visibility', 'hidden');
        $("#ads_container").css('visibility', 'hidden');
        $("#boost_circle").css('visibility', 'hidden');
        for (let i = 0; i < 3; i++) {
            const team_0_player_number = Number(i)+1;
            $(`#team_0_player_${team_0_player_number}`).attr('data-player', `player_${team_0_player_number}`);
            $(`#team_0_player_${team_0_player_number}_events`).attr('data-player', `player_${team_0_player_number}`);
            $(`#team_0_player_${team_0_player_number}_events`).css('visibility', 'hidden');
            $(`#team_0_player_${team_0_player_number}_name`).text(`Player ${team_0_player_number}`);
            $(`#team_0_player_${team_0_player_number}_boost`).text(33);
            $(`#team_0_player_${team_0_player_number}_boost_bar`).width(`${33}%`);
            const team_1_player_number = Number(i)+4;
            $(`#team_1_player_${team_1_player_number}`).attr('data-player', `player_${team_1_player_number}`);
            $(`#team_1_player_${team_1_player_number}_events`).attr('data-player', `player_${team_1_player_number}`);
            $(`#team_1_player_${team_1_player_number}_events`).css('visibility', 'hidden');
            $(`#team_1_player_${team_1_player_number}_name`).text(`Player ${team_1_player_number}`);
            $(`#team_1_player_${team_1_player_number}_boost`).text(33);
            $(`#team_1_player_${team_1_player_number}_boost_bar`).width(`${33}%`);
        } 
    });
});

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