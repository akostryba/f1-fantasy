export const singlePitScore = (pitStop) => {
    pitStop = pitStop/10;
    if (pitStop >= 3) {
        return 0;
    } else if (pitStop >=2.5) {
        return 2;
    } else if (pitStop >= 2.2) {
        return 5;
    } else if (pitStop >= 2) {
        return 10;
    } else if (pitStop > 0.1) {
        return 20;
    }
}