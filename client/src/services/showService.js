const baseURL = 'https://api.tvmaze.com';

const get = async (address) => {
    try {
        const resRaw = await fetch(address, { method: 'GET' });
        let resData = [];
        if (resRaw.ok == false) throw resRaw;
        if (resRaw.status != 204) resData = await resRaw.json();
        return resData;
    } catch (err) {
        if (err.message) {
            // console.log(err.message);
        }
        else if (err.stateText) {
            // console.log(err.stateText);
        }
        else {
            // console.log(err);
        }
        // re-throw if needed for global error handler or for page specific one
    }
};


export const shows = {
    page: async function (page = 0) { // max 250 per page
        return await get(`${baseURL}/shows?page=${page}`);
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
        showCast: async function (showId) {
            return await get(`${baseURL}/shows/${showId}/cast`);
        },
        showCrew: async function (showId) {
            return await get(`${baseURL}/shows/${showId}/crew`);
        },
        showAKAs: async function (showId) {
            return await get(`${baseURL}/shows/${showId}/akas`);
        },
        showImages: async function (showId) {
            return await get(`${baseURL}/shows/${showId}/images`);
        },
    },
};

export const episodes = {
    oneEpisode: {
        details: async function (episodeId) {
            return await get(`${baseURL}/episodes/${episodeId}?embed=show`);
        },
        guestCast: async function (episodeId) {
            return await get(`${baseURL}/episodes/${episodeId}/guestcast`);
        },
        guestCrew: async function (episodeId) {
            return await get(`${baseURL}/episodes/${episodeId}/guestcrew`);
        },
    },
};

export const actors = {
    page: async function (page = 0) { // max 1000 per page
        return await get(`${baseURL}/people?page=${page}`);
    },
    oneActor: {
        details: async function (actorId) {
            return await get(`${baseURL}/people/${actorId}?embed=castcredits`);
        },
        castCredits: async function (actorId) {
            return await get(`${baseURL}/people/${actorId}/castcredits?embed=show`);
        },
        crewCredits: async function (actorId) {
            return await get(`${baseURL}/people/${actorId}/crewcredits?embed=show`);
        },
        guestCastCredits: async function (actorId) {
            return await get(`${baseURL}/people/${actorId}/guestcastcredits?embed=episode`);
        },
    },
};

export const schedule = { // INCLUDES HISTORICAL DATA !!! Newest items first
    fullList: async function () {
        return await get(`${baseURL}/schedule/full`);
    },
    tvList: async function (date = 'YYYY-MM-DD', countryISOCode = 'XX') { // United Kingdom is GB 
        if (date == 'YYYY-MM-DD') {
            if (countryISOCode == 'XX') return await get(`${baseURL}/schedule`);
            return await get(`${baseURL}/schedule?country=${countryISOCode}`);
        }
        if (countryISOCode == 'XX') {
            return await get(`${baseURL}/schedule?date=${date}`);
        }
        return await get(`${baseURL}/schedule?date=${date}&country=${countryISOCode}`);
    },
    webList: async function (date = 'YYYY-MM-DD', countryISOCode = 'XX') { // United Kingdom is GB 
        if (date == 'YYYY-MM-DD' && countryISOCode == 'XX') {
            return await get(`${baseURL}/schedule/web`);
        } else if (countryISOCode == 'XX') {
            return await get(`${baseURL}/schedule/web?date=${date}`);
        } else {
            return await get(`${baseURL}/schedule/web?date=${date}&country=${countryISOCode}`);
        }
    },
};

export const search = {
    shows: async function (query) {
        return await get(`${baseURL}/search/shows?q=${query}`);
    },
    actors: async function (query) {
        return await get(`${baseURL}/search/people?q=${query}`);
    },
};

export const urlBuilder = {
    imdb: function (query) {
        return `https://www.imdb.com/title/${query}`;
    },
};
