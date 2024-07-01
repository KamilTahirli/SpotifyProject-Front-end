<template>
  <main class="main">
    <CategoryList :categories="categories"/>
  </main>
</template>
<script>
import CategoryList from "~/components/back/categories/list.vue";

export default {
  name: "CategoryPage.vue",
  layout: 'adminLayout',
  components: {CategoryList},


  head() {
    return {
      title: "Admin Panel | Bütün kateqoriyalar"
    }
  },

  computed: {
    categories() {
      return this.$store.getters['categories/getAllCategories']
    }
  },

  methods: {
    async allCategories() {
      await this.$store.dispatch('categories/getAllCategories', {admin: true})
    },
  },

  mounted() {
    this.allCategories()
  },

  beforeRouteLeave(to, from, next) {
    this.$store.commit('categories/RESET_PAGE');
    next();
  },
}
</script>