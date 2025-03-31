import {singlePitScore} from './singlePitScore';

export const calculatePitScore = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const pitStop = data[i].pit_duration;
        total += singlePitScore(pitStop);
    }
    return total;
}