import URL_CONSTANT from '~/constants/url-constant';

export const state = () => ({
    musics: {},
    foundMusics: {},
    similarMusics: {},
    artistMusics: {},
    categoryMusics: {}
});

export const mutations = {
    MUSICS(state, musics) {
        state.musics = musics;
    },
    FOUND_MUSICS(state, foundMusics) {
        state.foundMusics = foundMusics;
    },
    SIMILAR_MUSICS(state, musics) {
        state.similarMusics = musics;
    },
    ARTIST_MUSICS(state, musics) {
        state.artistMusics = musics;
    },
    CATEGORY_MUSICS(state, musics) {
        state.categoryMusics = musics;
    },
};

export const actions = {

    async getMusicDetail({commit}, musicId) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getMusicDetails, {
                params: {
                    music_id: musicId
                }
            })
            return response.data.details;
        } catch (error) {
            throw error;
        }
    },

    async getTrendMusicsForYt({commit}) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getTrendMusicsApi);
            commit('MUSICS', response.data.trends);
        } catch (error) {
            throw error;
        }
    },

    async search({commit, state}, params) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getSearchApi, {
                params: params
            });
            let newData = response.data.searchResults;
            if (params.token !== null && state.foundMusics.results) {
                newData.results = state.foundMusics.results.concat(newData.results);
            }
            commit('FOUND_MUSICS', newData);
        } catch (error) {
            throw error;
        }
    },

    async selectedArtistMusics({commit, state}, params) {
        try {
            let artistMusics = params;
            if (params.token !== null && state.artistMusics.results) {
                artistMusics.results = state.artistMusics.results.concat(artistMusics.results);
            }
            commit('ARTIST_MUSICS', artistMusics);
        } catch (error) {
            throw error;
        }
    },

    async selectedCategoryMusics({commit, state}, params) {
        try {
            let categoryMusics = params;
            if (params.token !== null && state.categoryMusics.results) {
                categoryMusics.results = state.categoryMusics.results.concat(categoryMusics.results);
            }
            commit('CATEGORY_MUSICS', categoryMusics);
        } catch (error) {
            throw error;
        }
    },

    async getSimilarMusics({commit}, musicName) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getSimilarMusics, {
                params: {
                    music_name: musicName
                }
            });
            commit('SIMILAR_MUSICS', response.data.similarMusics);
        } catch (error) {
            throw error;
        }
    },

    async getMusicData({commit}, musicId) {
        try {
            const apiUrl = URL_CONSTANT.getMusicDataUrl
            return await this.$axios.get(apiUrl, {
                params: {
                    music_id: musicId
                }
            })
        } catch (error) {
            throw error;
        }
    },

    async convertMusic({commit}, musicId) {
        try {
            const apiUrl = URL_CONSTANT.convertMusic
            const response = await this.$axios.post(apiUrl, {musicId: musicId})
            return response.data.resultMusic;
        } catch (error) {
            throw error;
        }
    },

    async saveMusicToDb({commit}, {music_url, music_id, music_name}) {
        try {
            const apiUrl = URL_CONSTANT.saveMusicToDb;
            const response = await this.$axios.post(apiUrl, {
                music_id,
                music_url,
                music_name
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async download({commit}, musicUrl) {
        try {
            return window.location.href = URL_CONSTANT.getMusicDownloadUrl + '/' + musicUrl
        } catch (error) {
            throw error;
        }
    },

};

export const getters = {
    get: (state) => (key) => {
        if (key === 'trend') {
            return state.musics
        }
        if (key === 'search') {
            return state.foundMusics
        }
        if (key === 'similar') {
            return state.similarMusics
        }
        if (key === 'artistMusics') {
            return state.artistMusics
        }
        if (key === 'categoryMusics') {
            return state.categoryMusics
        }
    },

};

