<template>
  <div>
    <main class="main">
      <Add/>
    </main>
  </div>
</template>

<script>
import Add from "/components/back/categories/add.vue"

export default {
  name: "AddNewCategory",
  layout: "adminLayout",
  components: {Add}
}
</script>