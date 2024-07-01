<template>
  <div>
    <header class="header">
      <div class="header__content">
        <div class="header__logo">
          <a href="index.html">
            mp3axtar.top
          </a>
        </div>

        <nav class="header__nav">
          <span class="text-white">Salam xoş gəlmişsiniz!</span>
        </nav>


        <div class="header__actions">
          <div class="header__action header__action--search">
            <button class="header__action-btn" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                    d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
              </svg>
            </button>
          </div>

          <div class="header__action header__action--note">
            <span>17</span>
            <a href="#" class="header__action-btn">
              <i class="fa-regular fa-bell"></i>
            </a>

            <div class="header__drop">
              <a href="#" class="header__all">View all</a>
              <div class="header__note header__note--succ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                      d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path>
                </svg>
                <p><a href="#modal-info2" class="open-modal">Payment #51</a> was successful!</p>
                <span>1 hour ago</span>
              </div>
              <div class="header__note header__note--fail">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                      d="M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z"></path>
                </svg>
                <p><a href="#modal-info3" class="open-modal">Payment #50</a> failed!</p>
                <span>2 hours ago</span>
              </div>
              <div class="header__note header__note--info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                      d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"></path>
                </svg>
                <p><a href="#modal-info4" class="open-modal">Example</a> of notification.</p>
                <span>2 hours ago</span>
              </div>
              <div class="header__note header__note--gift">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                      d="M18,7h-.35A3.45,3.45,0,0,0,18,5.5a3.49,3.49,0,0,0-6-2.44A3.49,3.49,0,0,0,6,5.5,3.45,3.45,0,0,0,6.35,7H6a3,3,0,0,0-3,3v2a1,1,0,0,0,1,1H5v6a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V13h1a1,1,0,0,0,1-1V10A3,3,0,0,0,18,7ZM11,20H8a1,1,0,0,1-1-1V13h4Zm0-9H5V10A1,1,0,0,1,6,9h5Zm0-4H9.5A1.5,1.5,0,1,1,11,5.5Zm2-1.5A1.5,1.5,0,1,1,14.5,7H13ZM17,19a1,1,0,0,1-1,1H13V13h4Zm2-8H13V9h5a1,1,0,0,1,1,1Z"></path>
                </svg>
                <p><a href="#modal-info5" class="open-modal">You have received a gift!</a></p>
                <span>4 hours ago</span>
              </div>
            </div>
          </div>

          <div class="header__action header__action--signin">
          <span class="header__action-btn">
            <router-link to="/profile">
              <span>{{ this.$auth.user.full_name }}</span>
            </router-link>
             <i @click.prevent="logout" class="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
          </div>
        </div>

        <button class="header__btn" type="button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
    <Sidebar/>
  </div>
</template>

<script>
import Sidebar from "@/components/layouts/back/sidebar.vue";

export default {
  name: 'HeaderPage',
  components: {Sidebar},
  methods: {
    logout() {
      try {
        this.$auth.logout();
        this.$router.push('/')
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.$toast.error(error.response.data.message)
        }
      }
    }
  }
}
</script>
