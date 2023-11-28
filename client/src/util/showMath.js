export function createPartials(showsData) {
    const result = [];
    while (showsData.length > 0) {
        if (showsData.length >= 50) result.push(showsData.splice(0, 50));
        else result.push(showsData.splice(0));
    }
    return result;
};
