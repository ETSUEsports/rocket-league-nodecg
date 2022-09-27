const cg_left_team = nodecg.Replicant('left_team');
const cg_right_team = nodecg.Replicant('right_team');
const replay_stats = nodecg.Replicant('replay_stats');

replay_stats.on('change', (newVal) => {
    if(typeof newVal !== "undefined"){
        if(newVal.scorer.teamnum == 0){
            $("#replay_stats_team").text(`${cg_left_team.value.name.toLowerCase()} Goal`);
        }else{
            $("#replay_stats_team").text(`${cg_right_team.value.name.toLowerCase()} Goal`);
        }
        $("#replay_stats_name").text(newVal.scorer.name);
        if(newVal.assister.name){
            $("#replay_stats_asst_container").css('visibility', 'visible');
            $("#replay_stats_asst").text(newVal.assister.name);
        }else{
            $("#replay_stats_asst_container").css('visibility', 'hidden');
        }
    }
})