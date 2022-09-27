$(() => {
    cg_left_team.on('change', (newVal) => {
        const player_names = newVal.player_names;
        for (const p in player_names) {
            console.log(player_names[p]);
            const player_number = p+1;
            $(`#team_0_player_${player_number}_name`).text(player_names[p]);  
        } 
        const player_data = newVal.player_data;
    })
    cg_right_team.on('change', (newVal) => {
        const player_names = newVal.player_names;
        const player_data = newVal.player_data;
    })
});