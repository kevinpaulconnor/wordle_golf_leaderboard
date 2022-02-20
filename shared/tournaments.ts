import { Tournament } from "./types"

type Override = {
    position: number,
    value: number
}

const overrideGenerator = (overrides:Override[]) :number[] => {
    let ret = [18];
    overrides.forEach(override => ret[override.position] = override.value);
    return ret;
}

export const tournaments :Tournament[] = [{
        name: "Phoenix Open",
        id: 0,
        beforeStartWordle: 228,
        beforeStartTime: 1643781600,
        pars: [4,4,5,3,4,4,3,4,4,4,4,3,5,4,5,3,4,4],
        overrides: [
            {
                "id":20893041,
                "displayName":"Jeff Arbor",
                "scores":overrideGenerator([{position: 15, value: 6}])
            },
        ]
    },
];

const currentTournamentId = 0;

export default currentTournamentId;