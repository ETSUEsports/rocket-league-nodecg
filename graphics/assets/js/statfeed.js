$(() => {
    const statfeed = nodecg.Replicant('statfeed', {defaultValue: []});
    WsSubscribers.subscribe("game", "statfeed_event", (d) => { //On Replay Start event, update HTML Elements
        console.log(`Event: game:statfeed_event`);
        if(d.event_name == "Shot"){
            const player = {
                "name": "",
                "team": 0
            }
            console.log(d);
            player.name = d.main_target.name;
            player.team = d.main_target.team_num;
            console.log(`${player.name} on team ${player.team} made a shot on goal`);
        } else if(d.event_name == "Save"){
            const player = {
                "name": "",
                "team": 0
            }
            console.log(d);
            player.name = d.main_target.name;
            player.team = d.main_target.team_num;
            console.log(`${player.name} on team ${player.team} made a save on goal`);
        } else if(d.event_name == "Demolish"){
            const attacker = {
                "name": "",
                "team": 0
            }
            const victim = {
                "name": "",
                "team": 0
            }
            console.log(d);
            attacker.name = d.main_target.name;
            attacker.team = d.main_target.team_num;
            victim.name = d.secondary_target.name;
            victim.team = d.secondary_target.team_num;
            console.log(`${attacker.name} on team ${attacker.team} demo'ed ${victim.name} on team ${victim.team}`);
        }
    });
});

function showActivity(team_id, activity_type, slot, player_id, victim_team_id, victim_player_id) {
    const target = `team_${team_id}_player_${player_id}_events_icon_${slot}`;
    switch (activity_type){
        case "SHOT":
            $(target).removeClass();
            $(target).addClass("icon_shot");
        case "SAVE":
            $(target).removeClass();
            $(target).addClass("icon_save");
        case "DEMO":
            $(target).removeClass();
            $(target).addClass("icon_demo");
            const victim = `team_${victim_team_id}_player_${victim_player_id}_events_icon_${slot}`;
    }

}

function addActivity(team_id, activity_type, player_id, victim_team_id, victim_player_id){
    statfeed.push({"team_id": team_id, "activity_type": activity_type, "player_id": player_id, "victim_team_id": victim_team_id, "victim_player_id": victim_player_id});
}