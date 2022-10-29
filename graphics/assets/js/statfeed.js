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
            console.log($(`.events[data-player="${d.main_target.id}"]`).children('i')[0]);
            showActivity(d.main_target.id, 'icon_shot');
        } else if(d.event_name == "Save"){
            const player = {
                "name": "",
                "team": 0
            }
            console.log(d);
            player.name = d.main_target.name;
            player.team = d.main_target.team_num;
            console.log(`${player.name} on team ${player.team} made a save on goal`);
            showActivity(d.main_target.id, 'icon_save');
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
            showActivity(d.main_target.id, 'icon_demo');
        }
    });
});

async function showActivity(target_id, icon){
    console.log(`Showing ${icon} for ${target_id}`);
    $(`.events[data-player="${target_id}"]`).css('visibility', 'visible');
    $(`.events[data-player="${target_id}"]`).addClass('active_events')
    $(`.events[data-player="${target_id}"] i:first`).addClass(icon).delay(8000).queue(function( next ){
        $(`.events[data-player="${target_id}"] i:first`).removeClass(icon); 
        $(`.events[data-player="${target_id}"]`).removeClass('active_events');
        $(`.events[data-player="${target_id}"]`).css('visibility', 'hidden');
        next();
    });
}