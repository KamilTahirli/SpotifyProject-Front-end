import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_4ff68f23 from 'nuxt_plugin_plugin_4ff68f23' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_srcplugin4041aae4_40ac8643 from 'nuxt_plugin_srcplugin4041aae4_40ac8643' // Source: .\\src.plugin.4041aae4.js (mode: 'client')
import nuxt_plugin_axios_49495fc6 from 'nuxt_plugin_axios_49495fc6' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_toastification_01a1dc6c from 'nuxt_plugin_toastification_01a1dc6c' // Source: ..\\plugins\\toastification.js (mode: 'client')
import nuxt_plugin_cleanString_457054f3 from 'nuxt_plugin_cleanString_457054f3' // Source: ..\\plugins\\cleanString.js (mode: 'all')
import nuxt_plugin_vueawesomeswiper_5ce03f58 from 'nuxt_plugin_vueawesomeswiper_5ce03f58' // Source: ..\\plugins\\vue-awesome-swiper.js (mode: 'all')
import nuxt_plugin_axiosinterceptor_d3021f42 from 'nuxt_plugin_axiosinterceptor_d3021f42' // Source: ..\\plugins\\axios-interceptor.js (mode: 'all')
import nuxt_plugin_goBack_708256f2 from 'nuxt_plugin_goBack_708256f2' // Source: ..\\plugins\\goBack.js (mode: 'all')
import nuxt_plugin_auth_58ac38aa from 'nuxt_plugin_auth_58ac38aa' // Source: .\\auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"front-end","htmlAttrs":{"lang":"az"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, user-scalable=no"},{"name":"format-detection","content":"telephone=no"},{"property":"og:type","content":"website"},{"property":"og:locale","content":"az_AZ"}],"script":[{"src":"\u002Fassets\u002Fjs\u002Fjquery-3.5.1.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fbootstrap.bundle.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fowl.carousel.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fjquery.magnific-popup.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fsmooth-scrollbar.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fselect2.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fslider-radio.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fjquery.inputmask.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fplyr.min.js","body":true},{"src":"\u002Fassets\u002Fjs\u002Fmain.js","body":true},{"src":"https:\u002F\u002Fcdn.plyr.io\u002F3.7.8\u002Fplyr.js","body":true}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Fassets\u002Fimages\u002Ffavicon.ico"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fbootstrap-reboot.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fbootstrap-grid.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fowl.carousel.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fmagnific-popup.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fselect2.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fpaymentfont.min.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fslider-radio.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fplyr.css"},{"rel":"stylesheet","href":"\u002Fassets\u002Fcss\u002Fmain.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ffont-awesome\u002F6.5.1\u002Fcss\u002Fall.min.css"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_4ff68f23 === 'function') {
    await nuxt_plugin_plugin_4ff68f23(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_srcplugin4041aae4_40ac8643 === 'function') {
    await nuxt_plugin_srcplugin4041aae4_40ac8643(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_49495fc6 === 'function') {
    await nuxt_plugin_axios_49495fc6(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toastification_01a1dc6c === 'function') {
    await nuxt_plugin_toastification_01a1dc6c(app.context, inject)
  }

  if (typeof nuxt_plugin_cleanString_457054f3 === 'function') {
    await nuxt_plugin_cleanString_457054f3(app.context, inject)
  }

  if (typeof nuxt_plugin_vueawesomeswiper_5ce03f58 === 'function') {
    await nuxt_plugin_vueawesomeswiper_5ce03f58(app.context, inject)
  }

  if (typeof nuxt_plugin_axiosinterceptor_d3021f42 === 'function') {
    await nuxt_plugin_axiosinterceptor_d3021f42(app.context, inject)
  }

  if (typeof nuxt_plugin_goBack_708256f2 === 'function') {
    await nuxt_plugin_goBack_708256f2(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_58ac38aa === 'function') {
    await nuxt_plugin_auth_58ac38aa(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
