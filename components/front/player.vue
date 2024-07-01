<template>

  <div>
    <div class="player">
      <div class="player-close-mobile">
        <i class="fa-solid fa-down-left-and-up-right-to-center"></i>
      </div>
      <div class="player__cover">
        <img :src="music_thumbnail ?? '/assets/images/music/cover.svg'" alt="">
      </div>

      <div class="player__content">
        <span class="player__track">
           <marquee behavior="scroll" direction="left" scrollamount="8" class="player__title">{{ music_name }}</marquee>
        </span>
        <audio
            id="player" controls
            controlslist="nodownload noremoteplayback noplaybackrate"
            ref="audioPlayer"
            :src="music_src"
            @ended="isPlaying = false">
        </audio>
      </div>
    </div>

    <button class="player__btn" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
            d="M21.65,2.24a1,1,0,0,0-.8-.23l-13,2A1,1,0,0,0,7,5V15.35A3.45,3.45,0,0,0,5.5,15,3.5,3.5,0,1,0,9,18.5V10.86L20,9.17v4.18A3.45,3.45,0,0,0,18.5,13,3.5,3.5,0,1,0,22,16.5V3A1,1,0,0,0,21.65,2.24ZM5.5,20A1.5,1.5,0,1,1,7,18.5,1.5,1.5,0,0,1,5.5,20Zm13-2A1.5,1.5,0,1,1,20,16.5,1.5,1.5,0,0,1,18.5,18ZM20,7.14,9,8.83v-3L20,4.17Z"/>
      </svg>
      Player
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      music_src: null,
      music_thumbnail: null,
      music_name: null,
      audio: null,
      musicId: null,
      musicBarEffect: false,
    }
  },
  computed: {
    playerData() {
      return this.$store.getters['player/get']
    }
  },
  watch: {
    playerData() {
      if (this.playerData.isPlaying) {
        if (!this.musicId || this.musicId !== this.playerData.musicId) {
          this.music_thumbnail = this.playerData.musicThumbnail
          this.music_name = this.playerData.musicName
          this.playFirst(this.playerData.musicId)
        } else {
          this.playContinue()
        }
      } else {
        this.stop()
      }
      this.musicId = this.playerData.musicId
    },

  },

  methods: {
    saveMp3ToDb(musicId, musicName) {
      return this.$store.dispatch('musicStore/saveMusicToDb', {
        music_id: musicId,
        music_name: musicName,
        music_url: this.music_src
      })
    },

    processToMp3(musicId) {
      this.$store.dispatch('musicStore/convertMusic', musicId)
          .then((resultMusic) => {
            this.music_src = resultMusic.download_url;
            this.audio.src = resultMusic.download_url
            this.audio.load()

            this.saveMp3ToDb(musicId, resultMusic.music_name)
                .finally(() => this.audio.play())
          })
    },


    playFirst(musicId) {
      this.audio.pause()
      this.audio.src = null
      this.$store.dispatch('musicStore/getMusicData', musicId)
          .then((res) => {
            if (res.data.getMusicData && Object.keys(res.data.getMusicData).length > 0) {
              this.audio.src = res.data.getMusicData.music_url;
              this.audio.load()
              this.audio.play()
            } else {
              this.processToMp3(musicId)
            }
          })
          .catch(error => {
            console.error("error");
          })

    },
    playContinue() {
      this.audio.play()
    },
    stop() {
      this.audio.pause();
    },
    resetPlayer() {
      this.musicBarEffect = false;
      if (this.audio) {
        this.audio.pause();
        this.audio.src = null;
      }
      this.music_thumbnail = null;
    },
    pausePlayer() {
      this.musicBarEffect = false
      this.$root.$emit('setBtnStatus', {
        musicId: this.musicId,
        status: false
      })
    },
    startPlayer() {
      this.musicBarEffect = true
      this.$root.$emit('setBtnStatus', {
        musicId: this.musicId,
        status: true
      })
    },

  },
  mounted() {
    if (process.client) {
      const player = new Plyr("#player", {
        settings: [],
        loop: {active: true}
      });
      this.audio = this.$refs.audioPlayer
      this.audio.addEventListener('pause', () => this.pausePlayer());
      this.audio.addEventListener('play', () => this.startPlayer());
    }
  },
  created() {
    this.$root.$on('resetPlayer', this.resetPlayer)
  },
  destroyed() {
    this.$root.$off('resetPlayer', this.resetPlayer)
  }
}
</script>


