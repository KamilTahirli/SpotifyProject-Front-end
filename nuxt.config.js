export default {

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'front-end',
        htmlAttrs: {
            lang: 'az'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no'},
            {name: 'format-detection', content: 'telephone=no'},
            {property: 'og:type', content: 'website'},
            {property: 'og:locale', content: 'az_AZ'},
        ],
        script: [
            {
                src:
                    '/assets/js/jquery-3.5.1.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/bootstrap.bundle.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/owl.carousel.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/jquery.magnific-popup.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/smooth-scrollbar.js',
                body: true
            },
            {
                src:
                    '/assets/js/select2.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/slider-radio.js',
                body: true
            },
            {
                src:
                    '/assets/js/jquery.inputmask.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/plyr.min.js',
                body: true
            },
            {
                src:
                    '/assets/js/main.js',
                body: true
            },
            {
                src:
                    'https://cdn.plyr.io/3.7.8/plyr.js',
                body: true
            },


        ],
        link: [
            {
                rel: 'icon', type: 'image/x-icon', href: '/assets/images/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/bootstrap-reboot.min.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/bootstrap-grid.min.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/owl.carousel.min.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/magnific-popup.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/select2.min.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/paymentfont.min.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/slider-radio.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/plyr.css'
            },
            {
                rel: 'stylesheet',
                href: '/assets/css/main.css'
            },
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
            }
        ]

    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        'swiper/css/swiper.css'
    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {src: '~/plugins/toastification.js', mode: 'client'},
        {src: '~/plugins/cleanString.js', mode: 'all'},
        {src: '~/plugins/vue-awesome-swiper.js', mode: 'all'},
        '~/plugins/axios-interceptor.js',
        '~/plugins/goBack.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        standalone: true,
    },


    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/proxy',
        'nuxt-sweetalert2'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: 'http://localhost:8000', // Adjust to your API base URL
        credentials: true,
    },

    auth: {
        strategies: {
            local: {
                redirect: {
                    home: '/',
                    logout: '/login',
                    login: '/login',
                },
                token: {
                    property: 'token',
                    maxAge: 2592000 // 30 gun
                },
                user: {
                    property: false,
                },
                endpoints: {
                    csrf: {
                        url: '/sanctum/csrf-cookie'
                    },
                    login: {
                        url: '/api/v1/auth/login'
                    },
                    user: {
                        url: '/api/v1/user',
                        propertyName: false
                    },
                    logout: {
                        url: '/api/v1/logout'
                    }
                },
            },
        },
    },



    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        siteName: process.env.SITE_NAME || 'MP3AXTAR.TOP',
    },

}
