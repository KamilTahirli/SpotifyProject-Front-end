<template>
  <main class="main" :style="mainStyle">
    <div class="category-header">
      <img :src="category.image" :alt="category.name" class="category-image">
      <div class="category-info">
        <h1>Kateqoriya | {{ category.name }}</h1>
        <p>{{ category.name }} - kateqoriyası üzrə musiqilər</p>
      </div>
    </div>
    <div class="container-fluid">
      <MusicList
          :search-query="categorySlug"
          :list-title="title"
          :list-key="key"/>
    </div>
  </main>
</template>

<script>
import MusicList from '~/components/front/music-list/list.vue';

export default {
  name: "CategoryDetailsPage",
  components: { MusicList },
  data() {
    return {
      category: {},
      meta: {}
    };
  },

  computed: {
    mainStyle() {
      return {
        '--category-color': this.category.color ? this.category.color : 'rgba(31, 79, 46, 0.51)'
      };
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

  async asyncData({ params, store, error }) {
    try {
      const categorySlug = params.slug;
      const response = await store.dispatch('categories/categoryDetails', {
        category_slug: categorySlug,
        token: null
      });
      const category = response.category;
      const meta = {
        title: `${category.name} - kateqoriyası üzrə musiqilər | ${process.env.siteName}`,
        description: ` ${process.env.siteName} musiqi platformasında ${category.name} - kateqoriyası üzrə bütün musiqiləri kəşf et, pulsuz yüklə!`,
        og_image: `${category.image}`
      };
      return {
        category,
        meta,
        title: "Kateqoriya üzrə musiqilər",
        key: "categoryMusics",
        categorySlug
      };
    } catch (err) {
      error({ statusCode: 404, message: 'Kateqoriya tapılmadı' });
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit('musicStore/CATEGORY_MUSICS', {});
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
.category-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

@media (min-width: 480px) {
  .category-header {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
  }
}

.category-image {
  object-fit: cover;
  object-position: center;
  width: 140px;
  height: 140px;
}

@media (min-width: 480px) {
  .category-image {
    margin-bottom: 0;
    margin-right: 20px;
  }
}

.category-info {
  flex-grow: 1;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.category-info h1 {
  margin: 0;
  font-size: 2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-info p {
  margin: 0;
  font-size: 1.2em;
}

.main {
  background: linear-gradient(314deg, #1e1e1e, #16151a, #16151a, var(--category-color));
}
</style>
