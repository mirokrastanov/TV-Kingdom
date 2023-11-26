export function returnInfData(showsData, infSize, infPage) {
    const length = showsData.length;
    if (length <= 0) return [];
    else if (length <= infSize * infPage + infSize) return showsData.slice(0);
    else return showsData.slice(infSize * infPage, infSize * infPage + infSize);
};

