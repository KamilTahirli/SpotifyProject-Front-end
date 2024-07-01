
export const state = () => ({
    isLoading: false,
});

export const mutations = {
    setLoading(state, value) {
        state.isLoading = value;
    },
};

export const actions = {
    updateLoading({ commit }, value) {
        commit('setLoading', value);
    },
};
