<template>
  <li
      :title="musicTitle"
      :class="{'single-item__active': isPlaying}"
      class="single-item">

    <div
        class="single-item__cover">

      <div class="media-content">
        <i
            @click.prevent.stop="playPause(selectedMusic.videoId, selectedMusic.thumbnail, musicTitle)"
            :class="{'fa-solid fa-pause': isPlaying, 'fa-solid fa-play': !isPlaying}">
        </i>
        <img :src="selectedMusic.thumbnail" :alt="musicTitle">
      </div>

    </div>
    <router-link :to="'/detail/' + selectedMusic.slug" class="single-item__title">
      <span>
       {{ musicTitle }}
      </span>
    </router-link>
    <a href="#" class="single-item__add">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"></path>
      </svg>
    </a>
    <span @click.prevent="download(selectedMusic.videoId)" class="single-item__export">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"></path>
      </svg>
    </span>
    <span class="single-item__time">{{ selectedMusic.duration }}</span>
  </li>
</template>

<script>
export default {
  props: {
    selectedMusic: {
      type: Array | Object,
      required: true
    },
  },
  data() {
    return {
      isPlaying: false,
      playBtnStatus: {}
    }
  },
  methods: {
    setBtnStatus(playerData) {
      if (this.selectedMusic.videoId === playerData.musicId) {
        if (playerData.status) {
          this.isPlaying = true
        } else {
          this.isPlaying = false
        }
      }
    },
    setAllBtnStatus(musicId) {
      if (this.selectedMusic.videoId !== musicId) {
        this.isPlaying = false
      }
    },
    playPause(musicId, musicThumbnail, musicTitle) {
      this.isPlaying = !this.isPlaying
      this.$store.commit('player/set', {
        musicId: musicId,
        musicThumbnail: musicThumbnail,
        musicName: musicTitle,
        isPlaying: this.isPlaying
      })

      this.$root.$emit('setAllBtnStatus', musicId)
    },
    download(musicId) {
      this.$store.dispatch('musicStore/getMusicData', musicId)
          .then((res) => {
            if (res.data.getMusicData && Object.keys(res.data.getMusicData).length > 0) {

              this.$store.dispatch('musicStore/download', res.data.getMusicData.music_name)

            } else {
              this.processDownloadToMp3(musicId)
            }
          })
          .catch(error => {
            console.error("error");
          })
    },
    processDownloadToMp3(musicId) {
      this.$store.dispatch('musicStore/convertMusic', musicId)
          .then((resultMusic) => {
            this.saveMp3ToDb(musicId, resultMusic.music_name, resultMusic.download_url)
                .then((res) => {
                  this.download(musicId)
                });
          })
    },

    saveMp3ToDb(musicId, musicName, downloadUrl) {
      return this.$store.dispatch('musicStore/saveMusicToDb', {
        music_id: musicId,
        music_name: musicName,
        music_url: downloadUrl
      })
    }
  },
  computed: {
    musicTitle() {
      return this.$cleanString(this.selectedMusic.title)
    }
  },
  created() {
    this.$root.$on('setAllBtnStatus', this.setAllBtnStatus)
    this.$root.$on('setBtnStatus', this.setBtnStatus)
  },
  destroyed() {
    this.$root.$off('setAllBtnStatus', this.setAllBtnStatus)
    this.$root.$on('setBtnStatus', this.setBtnStatus)
  }
}
</script>