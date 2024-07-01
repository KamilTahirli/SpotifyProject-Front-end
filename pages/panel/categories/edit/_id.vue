<template>
  <div>
    <main class="main">
      <Edit :category="category"/>
    </main>
  </div>
</template>

<script>
import Edit from "/components/back/categories/edit.vue"

export default {
  name: "EditCategoryPage",
  layout: "adminLayout",
  components: {Edit},

  computed: {
    category() {
      return this.$store.getters['categories/getCategory']
    }
  },

  methods: {
    getCategory() {
      let categoryId = this.$route.params.id
      this.$store.dispatch('categories/getCategory', categoryId)
          .catch(error => {
            if (error.response && error.response.status === 404)
              $nuxt.error({statusCode: error.response.status, message: 'Kateqoriya tapılmadı'});
          })
    }
  },

  mounted() {
    this.getCategory()
  }
}
</script>