import { Tournament, Hole } from "./types";
import read from './s3';

type Override = {
    position: number,
    value: number
}

export function tournamentFilename(id:number) {
    return `tournament-${id}.json`;
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
    {
        name: "Tampa Bay Classic",
        id: 2,
        beforeStartWordle: 264,
        beforeStartTime: 1646805600,
        overrides: {},
    },
    {
        name: "Masters",
        id: 3,
        beforeStartWordle: 282,
        beforeStartTime: 1648357200,
        overrides: {
            "6986573": {
                "id":6986573,
                "displayName":"Dan Ubilla",
                "scores":overrideGenerator([{position: 11, value: 7}])
            },
        },
    },
    {
        name: "Not *That* Kind of Heritage Classic",
        id: 4,
        beforeStartWordle: 300,
        beforeStartTime: 1649912400,
        overrides: {},
    },
    {
        name: "PGA Championship",
        id: 5,
        beforeStartWordle: 318,
        beforeStartTime: 1651467600,
        overrides: {},
    },
    {
        name: "Memorial",
        id: 6,
        beforeStartWordle: 336,
        beforeStartTime: 1653022800,
        overrides: {},
    },
    {
        name: "US Open",
        id: 7,
        beforeStartWordle: 354,
        beforeStartTime: 1654578000,
        overrides: {},
    },
    {
        name: "Open Championship",
        id: 8,
        beforeStartWordle: 372,
        beforeStartTime: 1656133200,
        overrides: {},
    },
    {
        name: "Detroit Open",
        id: 9,
        beforeStartWordle: 390,
        beforeStartTime: 1657688400,
        overrides: {},
    },
    {
        name: "Memphis Open",
        id: 10,
        beforeStartWordle: 408,
        beforeStartTime: 1659243600,
        overrides: {},
    },
    {
        name: "Western Open",
        id: 11,
        beforeStartWordle: 426,
        beforeStartTime: 1660798800,
        overrides: {},
    },
    {
        name: "window.open()",
        id: 12,
        beforeStartWordle: 444,
        beforeStartTime: 1662354000,
        overrides: {},
    },
    {
        name: "Center for Kids Who Can't Wordle Good",
        id: 13,
        beforeStartWordle: 462,
        beforeStartTime: 1663909200,
        overrides: {},
    },
    {
        name: "Clash For Couch",
        id: 14,
        beforeStartWordle: 480,
        beforeStartTime: 1665464400,
        overrides: {},
    },
    {
        name: "Ty Detmer Open",
        id: 15,
        beforeStartWordle: 498,
        beforeStartTime: 1667019600,
        overrides: {
            "29615136": {
                "id":29615136,
                "displayName":"Nom Nom",
                "scores":overrideGenerator([{position: 0, value: 3}])
            },
        },
    },
    {
        name: "Spergon Wynn Memorial",
        id: 16,
        beforeStartWordle: 516,
        beforeStartTime: 1668574800,
        overrides: {},
    },
    {
        name: "Doug Pederson Nationals",
        id: 17,
        beforeStartWordle: 534,
        beforeStartTime: 1670130000,
        overrides: {},
    },
    {
        name: "Kelly Holcomb Classic",
        id: 18,
        beforeStartWordle: 552,
        beforeStartTime: 1671685200,
        overrides: {},
    },
    {
        name: "Jeff Garcia Outing",
        id: 19,
        beforeStartWordle: 570,
        beforeStartTime: 1673240400,
        overrides: {},
    },
    {
        name: "Luke McCown Championship",
        id: 20,
        beforeStartWordle: 588,
        beforeStartTime: 1674795600,
        overrides: {},
    },
    {
        name: "Dilfer",
        id: 21,
        beforeStartWordle: 606,
        beforeStartTime: 1676350800,
        overrides: {},
    },
    {
        name: "Charlie Frye Tournament",
        id: 22,
        beforeStartWordle: 624,
        beforeStartTime: 1677906000,
        overrides: {},
    },
    {
        name: "Derek Anderson Derby",
        id: 23,
        beforeStartWordle: 642,
        beforeStartTime: 1679461200,
        overrides: {},
    },
    {
        name: "FIDE Wordle Chess Championship",
        id: 24,
        beforeStartWordle: 660,
        beforeStartTime: 1681018400,
        overrides: {},
    },
    {
        name: "Blaine Gabbert Brand Wordle Tournament",
        id: 25,
        beforeStartWordle: 678,
        beforeStartTime: 1682575600,
        overrides: {},
    },
    {
        name: "A.J. Feeley Invitational",
        id: 26,
        beforeStartWordle: 696,
        beforeStartTime: 1684132800,
        overrides: {},
    },
    {
        name: "Alex Van Peltathon",
        id: 27,
        beforeStartWordle: 714,
        beforeStartTime: 1685690000,
        overrides: {},
    },
    {
        name: "The Open, presented by Gus Frerotte",
        id: 28,
        beforeStartWordle: 732,
        beforeStartTime: 1687247200,
        overrides: {},
    },
    {
        name: "A.J. Feeley Open",
        id: 29,
        beforeStartWordle: 750,
        beforeStartTime: 1688804400,
        overrides: {},
    },
    {
        name: "Caleb Hanie Championship",
        id: 30,
        beforeStartWordle: 768,
        beforeStartTime: 1690361600,
        overrides: {},
    },
    {
        name: "Placeholder Classic",
        id: 31,
        beforeStartWordle: 786,
        beforeStartTime: 1691918800,
        overrides: {},
    }
];
// 15572 is the time difference
export const calculateCurrentTournamentId = async(todayWritten:boolean) :Promise<number> => {
    let currentTournamentId = 0;
    let previousResultFinished = false;
    for (var i=0; i < tournaments.length; i++) {
        let result = await read(`tournament-${i}.json`);
        if (result === 'NoSuchKey') {
            if (currentTournamentId === 0) {
                if (!todayWritten && previousResultFinished) {
                    currentTournamentId = i;
                } else {
                    currentTournamentId = i - 1;
                }
            }
        } else {
            previousResultFinished = result.data.finished;
        }
    }
    return currentTournamentId;
}
