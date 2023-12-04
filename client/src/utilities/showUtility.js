export function createPartials(showsData) {
    const result = [];
    while (showsData.length > 0) {
        if (showsData.length >= 24) result.push(showsData.splice(0, 24));
        else result.push(showsData.splice(0));
    }
    return result;
};

export function extractYear(date) {
    return date ? (date.split('-'))[0] : date;
};

export function plotRating(rating) {
    let output = [];
    for (let i = 1; i <= 10; i++) {
        if (i <= rating) output.push(1);
        else if (i - 1 < rating && i > rating) output.push(0.5);
        else if (i > rating) output.push(0);
    }
    return output;
};

export function plotNum(num) {
    if (num < 10) return `0${num}`;
    return num;
}

export function getUniqueArr(arr) {
    const uniqueArray = [];
    const idSet = new Set();

    arr.forEach((x) => {
        const personId = x.person.id;
        if (!idSet.has(personId)) {
            idSet.add(personId);
            uniqueArray.push(x);
        }
    });
    return uniqueArray;
};
