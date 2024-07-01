<template>
  <div class="container">
    <h4 class="text-white text-center mt-3">Yeni kateqoriya</h4>
    <form @submit.prevent="add" class="mt-3">
      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Kateqoriya adı</label>
        <input type="text" v-model="form.name" class="form-control">
      </div>

      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Kateqoriya slug</label>
        <input type="text" v-model="form.slug" class="form-control">
      </div>

      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Axtarış açarı</label>
        <input type="text" v-model="form.search_query" class="form-control">
      </div>

      <div class="form-group mt-2" data-bs-theme="dark">
        <label>Kateqoriya şəkli</label>
        <input ref="file" type="file" accept="image/*" @change="selectImage" class="form-control">

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
            <select v-model="form.status" class="form-control">
              <option value="A">Aktiv</option>
              <option value="D">Deaktiv</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6 col-6">
          <div class="form-group mt-2" data-bs-theme="dark">
            <label>Rəng</label>
            <input type="color" v-model="form.color" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group mt-3">
        <button type="submit" class="btn btn-success">Əlavə et</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddCategoryComponent",
  data() {
    return {
      form: {
        name: null,
        slug: null,
        search_query: null,
        image: '',
        status: this.status === "Aktiv" ? "A" : "D",
        color: '#ffffff'
      },
      imagePreview: null
    }
  },


  head() {
    return {
      title: "Admin Panel | Yeni kateqoriya yarat"
    }
  },

  methods: {
    async add() {
      const formData = new FormData();
      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key]);
      });
      await this.$store.dispatch('categories/createCategory', formData)
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
