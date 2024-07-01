<template>
  <main class="main">
    <div class="container-fluid">
      <MusicList
          :search-query="searchQuery"
          :list-title="title"
          :list-key="key"
      />
    </div>
  </main>
</template>

<script>
import MusicList from '~/components/front/music-list/list.vue'

export default {
  name: "SearchResultPage",
  components: {MusicList},

  async asyncData({params, store}) {
    const searchQuery = params.query
    await store.dispatch('musicStore/search', {query: searchQuery, token: null})
    return {
      title: "Tapılan nəticələr",
      key: "search",
      searchQuery
    }
  },

  mounted() {
    this.$store.commit('player/reset')
    this.$root.$emit('resetPlayer')
    this.$root.$emit('setAllBtnStatus', null)
  }
}
</script>

