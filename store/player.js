const initialPlayer = {
    musicId: null,
    musicName: null,
    musicThumbnail: null,
    isPlaying: false
}
export const state = () => ({
    player: initialPlayer,
});

export const mutations = {
    set(state, data) {
        state.player = data
    },
    reset(state) {
        state.player = initialPlayer
    }
};

export const getters = {
    get(state) {
        return {...state.player}
    }
};

export const actions = {};
