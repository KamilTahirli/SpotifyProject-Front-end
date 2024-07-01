import URL_CONSTANT from '~/constants/url-constant';

export const state = () => ({
    category: {},
    allCategories: {
        data: [],
        lastPage: null,
        currentPage: null
    },
    page: 1,
    limitedCategories: []
});

export const mutations = {
    SET_CATEGORY(state, category) {
        state.category = category
    },
    DELETE_CATEGORY(state, categoryId) {
        const categoryIndex = state.allCategories.data.findIndex(cat => cat.id === categoryId)
        if (categoryIndex > -1) {
            state.allCategories.data.splice(categoryIndex, 1)
        }
    },
    SET_CATEGORIES(state, categories) {
        state.allCategories.data = categories.data;
        state.allCategories.lastPage = categories.last_page;
        state.allCategories.currentPage = categories.current_page;
    },
    SET_LIMITED_CATEGORIES(state, limitedCategories) {
        state.limitedCategories = limitedCategories
    },
    APPEND_CATEGORIES(state, categories) {
        state.allCategories.data = state.allCategories.data.concat(categories.data);
        state.allCategories.lastPage = categories.last_page;
        state.allCategories.currentPage = categories.current_page;
    },
    INCREMENT_PAGE(state) {
        state.page++;
    },
    RESET_PAGE(state) {
        state.page = 1;
    }
};

export const actions = {
    async getAllCategories({commit, state}, params) {
        try {
            let url = `${URL_CONSTANT.getAllCategories}?page=${state.page}`;

            if (params && params.admin) {
                url += '&admin=true';
            }

            const response = await this.$axios.get(url);
            if (state.page === 1) {
                commit('SET_CATEGORIES', response.data.categories);
            } else {
                commit('APPEND_CATEGORIES', response.data.categories);
            }
            commit('INCREMENT_PAGE');
        } catch (error) {
            throw error;
        }
    },

    async getLimitedCategories({commit}) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getlimitedCategories);
            commit('SET_LIMITED_CATEGORIES', response.data.categories);
        } catch (error) {
            throw error;
        }
    },

    async categoryDetails({commit, dispatch, state}, params) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getCategoryDetails, {
                params
            });

            let categoryDetails = response.data.categoryDetails;
            if (categoryDetails) {
                await dispatch('musicStore/selectedCategoryMusics', categoryDetails.musics, {root: true});
            }
            return categoryDetails
        } catch (error) {
            throw error;
        }
    },

    async createCategory({commit, dispatch, state}, params) {
        try {
            return await this.$axios.post(URL_CONSTANT.getCreateCategory, params);
        } catch (error) {
            throw error
        }
    },

    async updateCategory({commit, dispatch, state}, params) {
        try {
            return await this.$axios.post(URL_CONSTANT.getUpdateCategory + '/' + params.get('id'), params);
        } catch (error) {
            throw error
        }
    },


    async deleteCategory({commit}, params) {
        try {
            const response = await this.$axios.delete(URL_CONSTANT.getDeleteCategory + '/' + params.id);
            commit('DELETE_CATEGORY', params.id)
            return response
        } catch (error) {
            throw error
        }
    },

    async changeCategoryStatus({commit}, params) {
        try {
            return await this.$axios.patch(URL_CONSTANT.getChangeCategoryStatus + '/' + params.categoryId, {
                categoryStatus: params.categoryStatus
            })
        } catch (error) {
            throw error
        }
    },

    async getCategory({commit, dispatch, state}, categoryId) {
        try {
            const response = await this.$axios.get(URL_CONSTANT.getCategory + '/' + categoryId);
            commit('SET_CATEGORY', response.data.category)
        } catch (error) {
            throw error
        }
    }
};

export const getters = {
    getAllCategories(state) {
        return state.allCategories;
    },
    getLimitedCategories(state) {
        return state.limitedCategories;
    },
    getCategory(state) {
        return state.category;
    }
};

