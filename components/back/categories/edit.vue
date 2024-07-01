<template>
  <div class="container">
    <h4 class="text-white text-center mt-3">Kateqoriyaya düzəliş</h4>
    <form @submit.prevent="edit" class="mt-3">
      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Kateqoriya adı</label>
        <input type="text" v-model="categoryData.name" class="form-control">
      </div>

      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Kateqoriya slug</label>
        <input type="text" v-model="categoryData.slug" class="form-control">
      </div>

      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Axtarış açarı</label>
        <input type="text" v-model="categoryData.search_query" class="form-control">
      </div>

      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Kateqoriya şəkli</label>
        <input ref="file" type="file" accept="image/*" @change="selectImage" class="form-control">

        <img v-if="imagePreview === null" :src="category.image" class="image-preview">

        <div v-if="imagePreview !== null">
          <img :src="imagePreview" class="image-preview">
          <button type="button" class="btn btn-sm btn-danger" @click="removeImagePreview">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

      </div>

      <div class="row">
        <div class="col-lg-6 col-6">
          <div class="form-group mt-2" data-bs-theme="dark">
            <label>Status</label>
            <select v-model="categoryData.status" class="form-control">
              <option value="A">Aktiv</option>
              <option value="D">Deaktiv</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6 col-6">
          <div class="form-group mt-2" data-bs-theme="dark">
            <label>Rəng</label>
            <input type="color" v-model="categoryData.color" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group mt-3">
        <button type="submit" class="btn btn-warning">Düzəliş et</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UpdateCategoryComponent",

  props: {
    category: Object,
    required: true
  },

  data() {
    return {
      categoryData: {},
      form: {
        image: ''
      },
      imagePreview: null
    }
  },

  watch: {
    category(newCategory) {
      if (newCategory) {
        this.categoryData = { ...newCategory };
      }
    },
  },

  head() {
    return {
      title: "Admin Panel | Kateqoriyaya düzəliş"
    }
  },

  methods: {
    async edit() {
      const formData = new FormData();
      formData.append('id', this.categoryData.id);
      formData.append('name', this.categoryData.name);
      formData.append('slug', this.categoryData.slug);
      formData.append('search_query', this.categoryData.search_query);
      formData.append('status', this.categoryData.status);
      formData.append('color', this.categoryData.color);
      formData.append('_method', "PUT");

      if (this.form.image) {
        formData.append('image', this.form.image);
      }

      await this.$store.dispatch('categories/updateCategory', formData)
          .then(res => {
            this.$toast.success(res.data.message)
            this.$router.push('/panel/categories')
          })
          .catch(error => {
            if (error.response && error.response.status === 422) {
              this.$toast.error(error.response.data.message)
            }
          })
    },

    selectImage: function (e) {
      this.form.image = e.target.files[0];
      this.imagePreview = URL.createObjectURL(this.form.image)
    },

    removeImagePreview() {
      this.imagePreview = null
      this.image = ''
      this.$refs.file.value = null
    }
  }


}
</script>
