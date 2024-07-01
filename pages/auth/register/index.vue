<template>
  <main class="main">
    <div class="container-fluid">
      <div class="row row--grid">

        <div class="col-12">
          <div class="sign">
            <div class="sign__content">

              <form @submit.prevent="register" class="sign__form">

                <router-link :to="'/'" class="sign__logo">
                  <img src="img/logo.svg" alt="">
                </router-link>

                <div class="sign__group">
                  <input v-model="form.full_name" type="text" class="sign__input" placeholder="Ad syoad" required>
                </div>

                <div class="sign__group">
                  <input v-model="form.email" type="text" class="sign__input" placeholder="Elektron poçt ünvanı"
                         required>
                </div>

                <div class="sign__group">
                  <input v-model="form.password" type="password" class="sign__input" placeholder="Şifrə" required>
                </div>


                <button class="sign__btn" type="submit">Qeyd ol</button>

                <span class="sign__delimiter">və ya</span>

                <span class="sign__text">
                  <router-link to="/auth/login">Daxil ol</router-link>
                </span>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UrlConstant from "../../../constants/url-constant";

export default {
  name: 'RegisterPage',
  middleware: 'guest',
  data() {
    return {
      form: {
        full_name: null,
        email: null,
        password: null
      },
      meta: {
        title: `${process.env.siteName} | Hesab yarat`,
        description: `${process.env.siteName} | Hesab yarat`,
      }
    };
  },

  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: process.env.siteName
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: process.env.baseUrl + this.$route.fullPath
        },
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
        }
      ]
    }
  },

  methods: {
    async register() {
      try {
        const response = await this.$axios.post(UrlConstant.getRegister, this.form)
        await this.$auth.setUserToken(response.data.data.token)
        await this.$router.push('/')
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.$toast.error(error.response.data.message)
        }
      }
    }
  }
}
</script>