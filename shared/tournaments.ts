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
            par: tournament.pars[i-1],
        };
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
        pars: [4,4,5,3,4,4,3,4,4,
            4,4,3,5,4,5,3,4,4],
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
        pars: [4,5,3,4,4,4,4,3,5,
            4,5,4,3,4,4,5,3,4],
        overrides: {},
    },
];

const currentTournamentId = 0;

export default currentTournamentId;