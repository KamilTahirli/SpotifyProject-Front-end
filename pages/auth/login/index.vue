<template>
  <main class="main">
    <div class="container-fluid">
      <div class="row row--grid">

        <div class="col-12">
          <div class="sign">
            <div class="sign__content">

              <form @submit.prevent="login" class="sign__form">

                <router-link :to="'/'" class="sign__logo">
                  <img src="img/logo.svg" alt="">
                </router-link>

                <div class="sign__group">
                  <input v-model="form.email" type="text" class="sign__input" placeholder="Elektron poçt ünvanı" required>
                </div>

                <div class="sign__group">
                  <input v-model="form.password" type="password" class="sign__input" placeholder="Şifrə" required>
                </div>


                <button class="sign__btn" type="submit">Daxil ol</button>

                <span class="sign__delimiter">və ya</span>

                <span class="sign__text">
                  <router-link to="/auth/register">Qeydiyyatdan keç</router-link>
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
export default {
  name: 'LoginPage',
  middleware: 'guest',
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      meta: {
        title: `${process.env.siteName} | Daxil ol`,
        description: `${process.env.siteName} | Daxil ol`,
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
    async login() {
      try {
         const response = await this.$auth.loginWith('local', {
          data: this.form
        })
        await this.$auth.setUserToken(response.data.data.token)
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.$toast.error(error.response.data.message)
        }
      }
    }
  }
}
</script>