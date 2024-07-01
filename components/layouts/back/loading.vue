<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :can-cancel="canCancel"
             :is-full-page="fullPage"
             :height="height"
             :width="width"
             :color="color"
             :loader="loader"
             :background-color="bgColor"/>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: "LoadingComponent",
  props: {
    isLoadingStatus: Boolean
  },

  components: {
    Loading
  },

  data() {
    return {
      isLoading: false,
      fullPage: true,
      canCancel: false,
      useSlot: false,
      loader: 'dots',
      color: '#ffffff',
      bgColor: '#ffffff',
      height: 100,
      width: 100
    }
  },

  watch: {
    isLoadingStatus(newVal) {
      this.isLoading = newVal;
    }
  },
}
</script>