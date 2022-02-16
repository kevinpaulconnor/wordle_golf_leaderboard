import Hole from './types';

export const currentRound = {
    id: 1,
    beforeStartWordle: 228
};


const generateHoles = (scores: number[] = []) :Hole[] => {
    const ret = [];
    for (let i = 1; i <= 18; i++) {
        let hole :Hole = {
            number: currentRound.beforeStartWordle + i,
            par: 4,
        };
        if (scores[i-1]) {
            hole.score = scores[i-1];
        }
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