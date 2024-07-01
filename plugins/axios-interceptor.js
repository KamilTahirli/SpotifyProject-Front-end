export default function({ $axios, store }) {

    // Request interceptor
    $axios.onRequest(config => {
        store.dispatch('loading/updateLoading', true);
        config.withCredentials = true;
        return config;
    });

    // Response interceptor
    $axios.onResponse(response => {
        store.dispatch('loading/updateLoading', false);
        return response;
    });

    // Error interceptor
    $axios.onError(error => {
        store.dispatch('loading/updateLoading', false);
        return Promise.reject(error);
    });
}
