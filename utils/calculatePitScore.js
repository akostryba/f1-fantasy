export const calculatePitScore = (data) => {
    let total = 0;
    for (let i = 0; i < data.length; i++) {
        const pitStop = data[i].pit_duration/10;
        if (pitStop >= 3) {
            continue;
        } else if (pitStop >=2.5) {
            total += 2;
        } else if (pitStop >= 2.2) {
            total+= 5;
        } else if (pitStop >= 2) {
            total+= 10;
        } else if (pitStop > 0.1) {
            total+= 20;
        }
    }
    return total;
}