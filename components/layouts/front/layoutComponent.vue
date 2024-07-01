<template>
  <div>
    <Header/>
    <LoadingPage :isLoadingStatus="isLoadingStatus"/>
    <slot/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/layouts/front/header.vue";
import Footer from "@/components/layouts/front/footer.vue";
import LoadingPage from "@/components/layouts/front/loading.vue";

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

