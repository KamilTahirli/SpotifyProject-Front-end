<template>

  <form @submit.prevent="search" class="header__search">
    <input
        type="text"
        v-model="query"
        placeholder="Axtarılacaq sözü daxil edin..." required>
    <button type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
      </svg>
    </button>
    <button type="submit" class="close">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  name: "SearchBoxComponent",

  data() {
    return {
      query: null
    }
  },
  methods: {
    search() {
      this.$router.push({ path: '/search/' + this.query});
    },
  },
}
</script>
