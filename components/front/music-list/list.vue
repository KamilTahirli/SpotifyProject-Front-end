<template>
  <div>
    <section v-if="musicList.results" class="row row--grid">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="row row--grid">
          <div class="col-12">
            <div class="main__title">
              <h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                      d="M21.65,2.24a1,1,0,0,0-.8-.23l-13,2A1,1,0,0,0,7,5V15.35A3.45,3.45,0,0,0,5.5,15,3.5,3.5,0,1,0,9,18.5V10.86L20,9.17v4.18A3.45,3.45,0,0,0,18.5,13,3.5,3.5,0,1,0,22,16.5V3A1,1,0,0,0,21.65,2.24ZM5.5,20A1.5,1.5,0,1,1,7,18.5,1.5,1.5,0,0,1,5.5,20Zm13-2A1.5,1.5,0,1,1,20,16.5,1.5,1.5,0,0,1,18.5,18ZM20,7.14,9,8.83v-3L20,4.17Z">
                  </path>
                </svg>
                <a href="#">{{ listTitle }}</a></h2>
            </div>
          </div>
          <div class="col-lg-12 col-md-12 col-sm-12">
            <ul class="main__list">
              <ListItem
                  v-for="(music, index) in musicList.results"
                  :selectedMusic="music"
                  :key="index"
              />
            </ul>
          </div>
        </div>
      </div>

      <button
          v-if="listKey === 'search'" class="btn-all-more" @click.prevent="allMoreSearchMusics">
        <span>Daha çox</span>
      </button>

      <button
          v-else-if="listKey === 'artistMusics'" class="btn-all-more" @click.prevent="allMoreArtistMusics">
        <span>Daha çox</span>
      </button>

      <button
          v-else-if="listKey === 'categoryMusics'" class="btn-all-more" @click.prevent="allMoreCategoryMusics">
        <span>Daha çox</span>
      </button>

      <div v-else-if="listKey !== 'similar'" class="alert alert-warning text-center">
        Siyahı boşdur
      </div>
    </section>
  </div>
</template>

<script>
import ListItem from './list-item.vue'

export default {
  components: {
    ListItem
  },

  props: {
    listTitle: {
      type: String,
      required: true
    },
    listKey: {
      type: String,
      required: true
    },
    searchQuery: {
      type: String,
    }
  },

  computed: {
    musicList() {
      return this.$store.getters['musicStore/get'](this.listKey);
    }
  },

  methods: {
    allMoreSearchMusics() {
      this.$store.dispatch('musicStore/search',
          {
            query: this.searchQuery,
            token: this.musicList.nextPageToken
          })
          .then(() => {
            this.$emit('title', "Axtarış üzrə nəticələr");
            this.$emit('key', "search");
          })
    },
    allMoreArtistMusics() {
      this.$store.dispatch('artist/artistDetails',
          {
            artist_slug: this.searchQuery,
            token: this.musicList.nextPageToken
          })
          .then(() => {
            this.$emit('title', "Axtarış üzrə nəticələr");
            this.$emit('key', "search");
          })
    },

    allMoreCategoryMusics() {
      this.$store.dispatch('categories/categoryDetails',
          {
            category_slug: this.searchQuery,
            token: this.musicList.nextPageToken
          })
          .then(() => {
            this.$emit('title', "Axtarış üzrə nəticələr");
            this.$emit('key', "search");
          })
    },
  }
}
</script>

<style scoped>
.row--grid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>