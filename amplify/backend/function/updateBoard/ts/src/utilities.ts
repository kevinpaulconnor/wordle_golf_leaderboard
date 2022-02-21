import Hole, { Tournament } from './shared/types';

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

export const relationToPar = (scores: (number | null)[], holes: Hole[]) :number => {
    let result = 0;
    let target;
    holes.forEach((hole, i) => {
        target = scores[i];
        if (typeof target === 'number') {
            let holeResult = target - hole.par;
            result = result + holeResult;
        }
    });
    return result;
}

export default generateHoles;