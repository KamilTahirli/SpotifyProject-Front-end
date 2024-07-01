<template>
  <div>
    <layoutComponent>
      <Nuxt/>
    </layoutComponent>
  </div>
</template>


<script>


import layoutComponent from "../components/layouts/back/layoutComponent.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {

  components: {
    layoutComponent
  },

  middleware: 'admin'
}
</script>
