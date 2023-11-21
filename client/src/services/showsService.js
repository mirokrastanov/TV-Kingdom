const baseURL = 'https://api.tvmaze.com';

const get = async (address) => {
    try {
        const resRaw = await fetch(address, { method: 'GET' });
        let resData = [];
        if (resRaw.ok == false) throw resRaw;
        if (resRaw.status != 204) resData = await resRaw.json();
        return resData;
    } catch (err) {
        if (err.message) console.log(err.message);
        else if (err.stateText) console.log(err.stateText);
        else console.log(err);
        // re-throw if needed for global error handler or for page specific one
    }
};


export const shows = {
    page: async function (page = 0) {
        const data = await get(`${baseURL}/shows?page=${page}`);
        return data;
    },
    one: {
        main: async function (id) {
            const data = await get(`${baseURL}/shows/${id}?embed=cast`);
            return data;
        },
        episodes: async function (id) {
            const data = await get(`${baseURL}/shows/${id}/episodes?specials=1`);
            return data;
        },
    },

};
