<template>
  <section class="row row--grid">
    <div class="col-12">
      <div class="main__title">
        <h2>Populyar ifaçılar</h2>
        <router-link :to="'/artists'" class="main__link">Hamısını göstər
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
          </svg>
        </router-link>
      </div>
    </div>
    <div class="carousel-container">
      <swiper :space-between="0" centered-slides>
        <swiper-slide v-for="(artist, index) in artists" :key="index" class="swiper-slide-custom">
          <router-link :to="'/artists/' + artist.slug" class="artist-card">
            <img :src="artist.cover" :alt="artist.name"/>
            <p>{{ artist.name }}</p>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ArtistList',

  computed: {
    artists() {
      return this.$store.getters['artist/getLimitedArtists']
    }
  },

  methods: {
    async getLimitedArtists() {
      await this.$store.dispatch('artist/getLimitedArtists')
    }
  },

  mounted() {
    this.getLimitedArtists();
  },
}
</script>

<style scoped>
.carousel-container {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
}

.swiper-container {
  width: 100%;
}

.swiper-slide-custom {
  width: auto !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.artist-card {
  text-align: center;
  width: 200px;
}

.artist-card:hover {
  background: linear-gradient(180deg, #43434378, #1a1a1a00, #6565651c);
}

.artist-card img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}

.artist-card p {
  margin-top: 10px;
  font-size: 1rem;
  color: white;
  font-weight: bold;
}
</style>
