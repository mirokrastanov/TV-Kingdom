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
    oneShow: {
        mainInfo: async function (showId) {
            return await get(`${baseURL}/shows/${showId}?embed=cast`);
        },
        episodes: async function (showId) {
            return await get(`${baseURL}/shows/${showId}/episodes?specials=1`);
        },
        oneEpisode: async function (showId, season, episode) {
            return await get(`${baseURL}/shows/${showId}/episodebynumber?season=${season}&number=${episode}`);
        },
        seasons: async function (showId) {
            return await get(`${baseURL}/shows/${showId}/seasons`);
        },
        oneSeason: async function (seasonId) {
            return await get(`${baseURL}/seasons/${seasonId}`);
        },
        oneSeasonEpisodes: async function (seasonId) {
            return await get(`${baseURL}/seasons/${seasonId}/episodes?embed=guestcast`);
        },
        showCast: async function(showId) {
            return await get(`${baseURL}/shows/${showId}/cast`);
        },
        showCrew: async function(showId) {
            return await get(`${baseURL}/shows/${showId}/crew`);
        },
        showAKAs: async function(showId) {
            return await get(`${baseURL}/shows/${showId}/akas`);
        },
        showImages: async function(showId) {
            return await get(`${baseURL}/shows/${showId}/images`);
        },

    },

};
