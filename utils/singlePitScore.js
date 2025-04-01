import pitScoring from '@/scoring/pitScoring.json';

export const singlePitScore = (index) => {
    return Number(pitScoring[index+1]) || 0;
}