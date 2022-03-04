import { Tournament, Hole } from "./types"

type Override = {
    position: number,
    value: number
}

const overrideGenerator = (overrides:Override[]) :number[] => {
    let ret = new Array(18);
    overrides.forEach(override => ret[override.position] = override.value);
    return ret;
}

export const generateHoles = (tournament:Tournament) :Hole[] => {
    const ret = [];
    for (let i = 1; i <= 18; i++) {
        let hole :Hole = {
            number: tournament.beforeStartWordle + i,
            par: 4,
        };
        if (tournament.players) {
            let playerCount = 0;
            let runningTotal = 0;
            let target;
            for (let j = 0; j < tournament.players.length; j++) {
                target = tournament.players[j].scores[i-1];
                if (typeof target === 'number') {
                    playerCount += 1;
                    runningTotal += target;
                }
            }
            if (playerCount > 0) {
                let average = runningTotal / playerCount;
                hole.average = Math.round(average * 10) / 10;
            }
        }
        ret.push(hole);
    }
    return ret;
}

export const tournaments :Tournament[] = [
    {
        name: "Phoenix Open",
        id: 0,
        beforeStartWordle: 228,
        beforeStartTime: 1643781600,
        overrides: {
            "20893041": {
                "id":20893041,
                "displayName":"Jeff Arbor",
                "scores":overrideGenerator([{position: 14, value: 6}])
            },
        },
    },
    {
        name: "Players Championship",
        id: 1,
        beforeStartWordle: 246,
        beforeStartTime: 1645250400,
        overrides: {},
    },
];

const currentTournamentId = 1;

export default currentTournamentId;