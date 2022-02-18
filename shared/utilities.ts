import Hole, { Tournament } from './types';

const generateHoles = (tournament:Tournament) :Hole[] => {
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

export const relationToPar = (scores: number[], holes: Hole[]) :number => {
    let result = 0;
    holes.forEach((hole, i) => {
        if (scores[i]) {
            let holeResult = scores[i] - hole.par;
            result = result + holeResult;
        }
    });
    return result;
}

export default generateHoles;