<template>
  <main class="main">
    <div class="artist-header">
      <img :src="artist.cover" :alt="artist.name" class="artist-image">
      <div class="artist-info">
        <h1>{{ artist.name }}</h1>
        <p>Sənətçi</p>
      </div>
    </div>
    <div class="container-fluid">
      <MusicList
          :search-query="artistSlug"
          :list-title="title"
          :list-key="key"/>
    </div>
  </main>
</template>

<script>
import MusicList from '~/components/front/music-list/list.vue';

export default {
  name: "ArtistDetailsPage",
  components: {MusicList},
  data() {
    return {
      artist: {},
      meta: {}
    };
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
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.meta.og_image
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: 1200
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: 630
        }
      ]
    }
  },

  async asyncData({params, store, error}) {
    try {
      const artistSlug = params.slug;
      const response = await store.dispatch('artist/artistDetails', {
        artist_slug: artistSlug,
        token: null
      });
      const artist = response.artist;
      const meta = {
        title: `${artist.name} - adlı sənətçinin musiqiləri | ${process.env.siteName}`,
        description: ` ${process.env.siteName} musiqi platformasında ${artist.name} - adlı sənətçinin bütün musiqilərini burada kəşf edə, rahat şəkildə pulsuz yükləyə bilərsiniz!`,
        og_image: `${artist.cover}`
      };
      return {
        artist,
        meta,
        title: "Sənətçinin musiqiləri",
        key: "artistMusics",
        artistSlug
      };
    } catch (err) {
      error({statusCode: 404, message: 'Sənətçi tapılmadı'});
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit('musicStore/ARTIST_MUSICS', {});
    next();
  },
  mounted() {
    this.$store.commit('player/reset');
    this.$root.$emit('resetPlayer');
    this.$root.$emit('setAllBtnStatus', null);
  }
};
</script>

<style scoped>
.artist-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

@media (min-width: 480px) {
  .artist-header {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
  }
}

.artist-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  margin-bottom: 10px;
}

@media (min-width: 480px) {
  .artist-image {
    margin-bottom: 0;
    margin-right: 20px;
  }
}

.artist-info {
  flex-grow: 1;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.artist-info h1 {
  margin: 0;
  font-size: 2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artist-info p {
  margin: 0;
  font-size: 1.2em;
}

.main {
  background: linear-gradient(314deg, #1e1e1e, #16151a, #16151a, rgba(31, 79, 46, 0.51));
}
</style>
