const baseURL = 'https://api.tvmaze.com';


export const shows = {
    all: async function (page = 0) {
        const res = await fetch(`${baseURL}/shows?page=${page}`);
        const data = await res.json();
        return data;
    },
    one: async function (id) {
        const res = await fetch(`${baseURL}/shows/${id}?embed=cast`);
        const data = await res.json();
        return data;
    },

};
