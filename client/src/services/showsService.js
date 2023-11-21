const baseURL = 'https://api.tvmaze.com';


export const shows = {
    all: async function () {
        const res = await fetch(`${baseURL}/shows`);
        const data = await res.json();
        return data;
    },
};
