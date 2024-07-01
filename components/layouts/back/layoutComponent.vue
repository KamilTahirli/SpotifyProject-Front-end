<template>
  <div>
    <Header/>
    <LoadingPage :isLoadingStatus="isLoadingStatus"/>
    <slot/>
    <Footer/>
  </div>
</template>

<script>

import LoadingPage from "@/components/layouts/back/loading.vue";
import Header from "@/components/layouts/back/header.vue";
import Footer from "@/components/layouts/back/footer.vue";

export default {
  components: {
    LoadingPage,
    Header, Footer
  },
  computed: {
    isLoadingStatus() {
      return this.$store.state.loading.isLoading;
    },
  },
}
</script>

