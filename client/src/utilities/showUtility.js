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
