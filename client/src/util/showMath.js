export function returnInfData(showsData, infSize, infPage) {
    const length = showsData.length;
    if (length <= 0) return [];
    else if (length <= infSize * infPage + infSize) return showsData.slice(0);
    else return showsData.slice(infSize * infPage, infSize * infPage + infSize);
};

export function createPartials(showsData) {
    const result = [];
    while (showsData.length > 0) {
        if (showsData.length >= 50) result.push(showsData.splice(0, 50));
        else result.push(showsData.splice(0));
    }
    return result;
};
