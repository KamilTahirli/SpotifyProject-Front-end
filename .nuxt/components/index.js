export { default as FrontPlayer } from '../..\\components\\front\\player.vue'
export { default as FrontSearchBox } from '../..\\components\\front\\search_box.vue'
export { default as BackCategoriesAdd } from '../..\\components\\back\\categories\\add.vue'
export { default as BackCategoriesEdit } from '../..\\components\\back\\categories\\edit.vue'
export { default as BackCategoriesList } from '../..\\components\\back\\categories\\list.vue'
export { default as FrontArtistsList } from '../..\\components\\front\\artists\\list.vue'
export { default as FrontCategoriesList } from '../..\\components\\front\\categories\\list.vue'
export { default as FrontMusicListItem } from '../..\\components\\front\\music-list\\list-item.vue'
export { default as FrontMusicList } from '../..\\components\\front\\music-list\\list.vue'
export { default as LayoutsBackFooter } from '../..\\components\\layouts\\back\\footer.vue'
export { default as LayoutsBackHeader } from '../..\\components\\layouts\\back\\header.vue'
export { default as LayoutsBackLayoutComponent } from '../..\\components\\layouts\\back\\layoutComponent.vue'
export { default as LayoutsBackLoading } from '../..\\components\\layouts\\back\\loading.vue'
export { default as LayoutsBackNavbar } from '../..\\components\\layouts\\back\\navbar.vue'
export { default as LayoutsBackSidebar } from '../..\\components\\layouts\\back\\sidebar.vue'
export { default as LayoutsFrontFooter } from '../..\\components\\layouts\\front\\footer.vue'
export { default as LayoutsFrontHeader } from '../..\\components\\layouts\\front\\header.vue'
export { default as LayoutsFrontLayoutComponent } from '../..\\components\\layouts\\front\\layoutComponent.vue'
export { default as LayoutsFrontLoading } from '../..\\components\\layouts\\front\\loading.vue'
export { default as LayoutsFrontNavbar } from '../..\\components\\layouts\\front\\navbar.vue'
export { default as LayoutsFrontSidebar } from '../..\\components\\layouts\\front\\sidebar.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
