<template>
  <div>
    <div class="d-flex mt-3">
      <div class="mr-auto p-2">
        ---
      </div>
      <div class="p-2">
        <router-link to="/panel/categories/add" class="btn btn-sm btn-success">
          <i class="fa-solid fa-plus"></i> ƏLAVƏ ET
        </router-link>
      </div>
    </div>
    <div class="table-responsive mt-5">
      <table class="table table-dark table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ad</th>
          <th scope="col">Slug</th>
          <th scope="col">Axtarış açarı</th>
          <th scope="col">Rəng kodu</th>
          <th scope="col">Foto</th>
          <th scope="col">Status</th>
          <th scope="col">Alətlər</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(category, index) in categories.data" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.name }}</td>
          <td>{{ category.slug }}</td>
          <td>{{ category.search_query }}</td>
          <td>{{ category.color }}</td>
          <td>
            <img :src="category.image" class="category_image_preview" :alt="category.name"/>
          </td>
          <td>
            <div class="form-check form-switch d-flex justify-content-center">
              <input class="form-check-input" @change.prevent="changeStatus(category.id, $event)"
                     :checked="category.status === 'A'" type="checkbox" role="switch">
            </div>
          </td>
          <td>
            <router-link :to="'/panel/categories/edit/' + category.id" type="button" class="btn btn-sm btn-warning">
              <i class="fa-regular fa-pen-to-square"></i>
            </router-link>
            <button @click.prevent="destroy(category.id)" class="btn btn-sm btn-danger">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <button v-if="categories.lastPage !== categories.currentPage" class="main__load"
              @click.prevent="allMoreCategories()"
              type="button">Daha çox
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CategoryListComponent.vue",
  layout: 'adminLayout',
  props: {
    categories: Object
  },
  methods: {
    async allMoreCategories() {
      await this.$store.dispatch('categories/getAllCategories', {admin: true})
    },
    async destroy(id) {
      const result = await this.$swal.fire({
        title: "Kateqoriya silinsin?",
        text: "Kateqoriya silindikdə, onunla birlikdə musiqiləridə silinəcək",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bəli",
        cancelButtonText: "Xeyr",
      });

      if (result.isConfirmed) {
        try {
          await this.$store.dispatch('categories/deleteCategory', {id});
          await this.$swal.fire({
            title: "Təbriklər!",
            text: "Kateqoriya uğurla silindi.",
            confirmButtonText: "Bağla",
            icon: "success"
          });
        } catch (error) {
          await this.$swal.fire({
            title: "Xəta!",
            text: "Kateqoriya silinərkən bir xəta baş verdi.",
            confirmButtonText: "Bağla",
            icon: "error"
          });
        }
      }
    },

    async changeStatus(categoryId, event) {
      const categoryStatus = event.target.checked ? "A" : "D"
      await this.$store.dispatch('categories/changeCategoryStatus', {categoryId, categoryStatus})
          .then(res => {
            this.$toast.success(res.data.message)
          })
    }
  }
}
</script>

<style scoped>
.category_image_preview {
  width: 75px;
  height: 75px;
}
</style>