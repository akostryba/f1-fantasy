import {singlePitScore} from './singlePitScore';

export const calculatePitScore = (indices) => {
    let total = 0;
    for (let i = 0; i < indices.length; i++) {
        total += singlePitScore(indices[i]);
    }
    return total;
}