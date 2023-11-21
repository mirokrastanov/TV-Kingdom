const baseURL = 'https://api.tvmaze.com';


export const shows = {
    all: async function (page = 0) {
        const res = await fetch(`${baseURL}/shows?page=${page}`);
        const data = await res.json();
        return data;
    },

};
