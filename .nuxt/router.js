import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4660b774 = () => interopDefault(import('..\\pages\\artists\\index.vue' /* webpackChunkName: "pages/artists/index" */))
const _7e53a766 = () => interopDefault(import('..\\pages\\categories\\index.vue' /* webpackChunkName: "pages/categories/index" */))
const _b95fd964 = () => interopDefault(import('..\\pages\\panel\\index.vue' /* webpackChunkName: "pages/panel/index" */))
const _7456cdf1 = () => interopDefault(import('..\\pages\\auth\\login\\index.vue' /* webpackChunkName: "pages/auth/login/index" */))
const _6f482857 = () => interopDefault(import('..\\pages\\auth\\register\\index.vue' /* webpackChunkName: "pages/auth/register/index" */))
const _4aa45b9c = () => interopDefault(import('..\\pages\\panel\\categories\\index.vue' /* webpackChunkName: "pages/panel/categories/index" */))
const _965a16fe = () => interopDefault(import('..\\pages\\panel\\categories\\add.vue' /* webpackChunkName: "pages/panel/categories/add" */))
const _5a75d2fc = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _1dd704d0 = () => interopDefault(import('..\\pages\\panel\\categories\\edit\\_id.vue' /* webpackChunkName: "pages/panel/categories/edit/_id" */))
const _49cdfa04 = () => interopDefault(import('..\\pages\\artists\\_slug.vue' /* webpackChunkName: "pages/artists/_slug" */))
const _7c9d061e = () => interopDefault(import('..\\pages\\categories\\_slug.vue' /* webpackChunkName: "pages/categories/_slug" */))
const _36e5fcc9 = () => interopDefault(import('..\\pages\\detail\\_slug.vue' /* webpackChunkName: "pages/detail/_slug" */))
const _b4adc41e = () => interopDefault(import('..\\pages\\search\\_query.vue' /* webpackChunkName: "pages/search/_query" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/artists",
    component: _4660b774,
    name: "artists"
  }, {
    path: "/categories",
    component: _7e53a766,
    name: "categories"
  }, {
    path: "/panel",
    component: _b95fd964,
    name: "panel"
  }, {
    path: "/auth/login",
    component: _7456cdf1,
    name: "auth-login"
  }, {
    path: "/auth/register",
    component: _6f482857,
    name: "auth-register"
  }, {
    path: "/panel/categories",
    component: _4aa45b9c,
    name: "panel-categories"
  }, {
    path: "/panel/categories/add",
    component: _965a16fe,
    name: "panel-categories-add"
  }, {
    path: "/",
    component: _5a75d2fc,
    name: "index"
  }, {
    path: "/panel/categories/edit/:id?",
    component: _1dd704d0,
    name: "panel-categories-edit-id"
  }, {
    path: "/artists/:slug",
    component: _49cdfa04,
    name: "artists-slug"
  }, {
    path: "/categories/:slug",
    component: _7c9d061e,
    name: "categories-slug"
  }, {
    path: "/detail/:slug?",
    component: _36e5fcc9,
    name: "detail-slug"
  }, {
    path: "/search/:query?",
    component: _b4adc41e,
    name: "search-query"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
