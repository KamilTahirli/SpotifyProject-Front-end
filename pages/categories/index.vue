<template>
  <main class="main">
    <div class="container-fluid">
      <div class="row row--grid">

        <div class="col-12">
          <div class="main__title main__title--page">
            <h1>Bütün kateqoriyalar</h1>
          </div>
        </div>

      </div>

      <div class="container mt-5">
        <div class="row">
          <div v-for="(category, index) in categories.data" :key="index" class="col-6 col-sm-4 col-lg-3">
            <router-link :to="'/categories/' + category.slug"  class="card card-category" :style="{background: category.color}">
              <div class="card-body">
                <img :src="category.image"
                     :alt="category.name"
                     class="card-image">
                <div class="card-category-title">{{ category.name }}</div>
              </div>
            </router-link>
          </div>
        </div>
        <button v-if="categories.lastPage !== categories.currentPage" class="main__load"
                @click.prevent="allMoreCategories()"
                type="button">Daha çox
        </button>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: "AllCategoriesPage",

  data() {
    return {
      meta: {
        title: `Bütün Musiqi Kateqoriyaları | ${process.env.siteName} - Müxtəlif Musiqi Janrlarını Kəşf Edin`,
        description: `Musiqi zövqünüzə uyğun olan hər şeyi burada tapın! ${process.env.siteName} sizə pop, rock, jazz, klassik, hip-hop və daha çox musiqi janrları ilə dolu geniş bir kolleksiya təqdim edir. Yeni musiqi kəşf edin və sevdiyiniz mahnıları dinləyin!`,
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
    categories() {
      return this.$store.getters['categories/getAllCategories']
    }
  },

  methods: {
    async allMoreCategories() {
      await this.$store.dispatch('categories/getAllCategories')
    }
  },

  async asyncData({store}) {
    try {
      await store.dispatch('categories/getAllCategories')
    } catch (err) {
      console.log(err)
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit('categories/RESET_PAGE');
    next();
  },
}
</script>


<style scoped>
.category__cover img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}

.card-category {
  color: white;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  background-color: #6C5CE7;
}

.card-category img.card-image {
  position: absolute;
  top: 60px;
  right: -30px;
  width: 140px;
  height: 140px;
  object-fit: cover;
  transform: rotate(28deg);
}

.card-category .card-category-title {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  color: white;
}
</style>