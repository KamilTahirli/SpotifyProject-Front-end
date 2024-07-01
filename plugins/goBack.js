// plugins/goBack.js
export default ({ app }, inject) => {
    inject('goBack', () => {
        const previousURL = document.referrer;
        const currentHost = window.location.host;

        if (previousURL && previousURL.includes(currentHost)) {
            app.router.go(-1);
        } else {
            app.router.push('/');
        }
    });
};
