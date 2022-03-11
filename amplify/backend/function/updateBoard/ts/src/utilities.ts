import Hole from './shared/types';

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

export default relationToPar;