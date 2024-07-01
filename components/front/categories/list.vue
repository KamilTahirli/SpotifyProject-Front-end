<template>
  <section class="row row--grid">
    <div class="col-12">
      <div class="main__title">
        <h2>Kateqoriyalar</h2>
        <router-link :to="'/categories'" class="main__link">Hamısını göstər
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
                d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
          </svg>
        </router-link>
      </div>
    </div>

    <div class="container mt-5">
      <div class="row">
        <div v-for="(category, index) in categories" :key="index" class="col-6 col-sm-4 col-lg-3">
          <router-link :to="'/categories/' + category.slug" class="card card-category" :style="{background: category.color}">
            <div class="card-body">
              <img :src="category.image"
                   :alt="category.name"
                   class="card-image">
              <div class="card-category-title">{{ category.name }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: 'CategoryList',

  computed: {
    categories() {
      return this.$store.getters['categories/getLimitedCategories']
    }
  },

  methods: {
    async getLimitedCategories() {
      await this.$store.dispatch('categories/getLimitedCategories')
    }
  },

  mounted() {
    this.getLimitedCategories();
  },
}
</script>

<style scoped>
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

.main__link {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
}
</style>
