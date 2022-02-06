import Hole from './types';

const generateHoles = (scores: number[] = []) :Hole[] => {
    const ret = [];
    for (let i = 1; i < 19; i++) {
        let hole :Hole = {
            number: i,
            par: 4,
        };
        if (scores[i-1]) {
            hole.score = scores[i-1];
        }
        ret.push(hole);
    }
    return ret;
}

export default generateHoles;