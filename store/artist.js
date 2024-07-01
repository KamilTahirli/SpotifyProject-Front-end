
// store/artist.js
import URL_CONSTANT from '~/constants/url-constant';

export const state = () => ({
    allArtists: {
        data: [],
        lastPage: null,
        currentPage: null
    },
    page: 1,
    limitedArtists: []
});

export const mutations = {
    SET_ARTISTS(state, artists) {
        state.allArtists.data = artists.data;
        state.allArtists.lastPage = artists.last_page;
        state.allArtists.currentPage = artists.current_page;
    },
    SET_LIMITED_ARTISTS(state, limitedArtists) {
        state.limitedArtists = limitedArtists
    },
    APPEND_ARTISTS(state, artists) {
        state.allArtists.data = state.allArtists.data.concat(artists.data);
        state.allArtists.lastPage = artists.last_page;
        state.allArtists.currentPage = artists.current_page;
    },
    INCREMENT_PAGE(state) {
        state.page++;
    },
    RESET_PAGE(state) {
        state.page = 1;
    }
};

export const actions = {
    async getAllArtists({commit, state}) {
        try {
            const response = await this.$axios.get(`${URL_CONSTANT.getAllArtists}?page=${state.page}`);
            if (state.page === 1) {
                commit('SET_ARTISTS', response.data.artists);
            } else {
                commit('APPEND_ARTISTS', response.data.artists);
            }
            commit('INCREMENT_PAGE');
        } catch (error) {
            throw error;
        }
    },

    async getLimitedArtists({commit}) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getLimitedArtists);
            commit('SET_LIMITED_ARTISTS', response.data.artists);
        } catch (error) {
            throw error;
        }
    },


    async artistDetails({commit, dispatch, state}, params) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getArtistDetails, {
                params
            });

            let artistDetails = response.data.artistDetails;
            if (artistDetails) {
                await dispatch('musicStore/selectedArtistMusics', artistDetails.musics, {root: true});
            }
            return artistDetails
        } catch (error) {
            throw error;
        }
    }

};

export const getters = {
    getAllArtists(state) {
        return state.allArtists;
    },
    getLimitedArtists(state) {
        return state.limitedArtists;
    }
};

