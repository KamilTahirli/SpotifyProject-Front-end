<template>
  <main class="main">
    <div class="container-fluid" data-select2-id="12">
      <div class="row row--grid">

        <div class="col-12">
          <div class="main__title main__title--page">
            <h1>Populyar ifaçılar</h1>

          </div>
        </div>

      </div>

      <div class="row row--grid">
        <div class="col-12">

          <div class="row row--grid">
            <div v-for="(artist, index) in artists.data" :key="index" class="col-6 col-sm-4 col-md-3 col-xl-2">
              <router-link :to="'/artists/' + artist.slug" class="artist">
                <div class="artist__cover">
                  <img :src="artist.cover" alt="artist.name">
                </div>
                <h3 class="artist__title">{{ artist.name }}</h3>
              </router-link>
            </div>
          </div>

          <button v-if="artists.lastPage !== artists.currentPage" class="main__load" @click.prevent="allMoreArtists()"
                  type="button">Daha çox
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "AllArtistsPage.vue",

  data() {
    return {
      meta: {
        title: `Bütün Musiqi Sənətçiləri | ${process.env.siteName} - Sevdiyiniz Musiqiçiləri Kəşf Edin`,
        description: `Bütün janrlarda ən məşhur və populyar musiqi sənətçilərini kəşf edin. ${process.env.siteName} ilə sevdiyiniz musiqiçilərin albomlarını, mahnılarını və biyografiyalarını tapın`,
      }
    }
  },

  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: process.env.siteName
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.baseUrl + this.$route.fullPath
        },
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
        }
      ]
    }
  },

  computed: {
    artists() {
      return this.$store.getters['artist/getAllArtists']
    }
  },

  methods: {
    async allMoreArtists() {
      await this.$store.dispatch('artist/getAllArtists')
    }
  },

  async asyncData({params, store, error}) {
    try {
      await store.dispatch('artist/getAllArtists')
    } catch (err) {
      console.log(err)
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit('artist/RESET_PAGE');
    next();
  },
}
</script>


<style scoped>
.artist__cover img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}
</style>