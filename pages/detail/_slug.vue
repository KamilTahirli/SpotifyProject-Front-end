<template>
  <div id="content" class="app-content white bg box-shadow-z2" role="main">
    <Navbar/>
    <Player/>
    <div class="app-body" id="view">
      <div v-if="musicDetail" class="page-content">

        <div class="container">
          <div class="row-col">
            <div class="col-sm w w-auto-xs m-b">
              <div class="item w r">
                <div class="item-media">
                  <div class="item-media-content media-image"
                       :style="{ backgroundImage: 'url(' + musicDetail.thumbnail + ')' }">
                  </div>
                  <div class="item-overlay center">
                    <button @click.prevent="playPause(musicDetail.videoId, musicDetail.thumbnail)"
                            class="btn-playpause"
                            :class="{'is-playing': isPlaying, 'is-paused': !isPlaying}">
                      Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm">
              <div class="p-l-md no-padding-xs">
                <h6 class="music-title">{{ musicTitle }}</h6>
                <p v-if="musicDescription" class="item-desc"
                   data-ui-toggle-class="text-ellipsis">
                  {{ musicDescription }}
                </p>
                <div class="item-action action-position">
                  <button
                      @click.prevent="playPause(musicDetail.videoId, musicDetail.thumbnail)"
                      class="btn btn-danger">
                    <i class="fa-solid"
                       :class="{'fa-pause': isPlaying, 'fa-play': !isPlaying}"></i>
                    {{ isPlaying ? 'Dayan' : 'Dinlə' }}
                  </button>
                  <button @click.prevent="download(musicDetail.videoId)" class="btn btn-success">
                    <i class="fa-regular fa-circle-down"></i> Yüklə
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row-col similar-list">
      <MusicList
          :list-title="title"
          list-key="similar"
      />
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/layouts/front/navbar.vue";
import Player from "~/components/front/player.vue";
import MusicList from "~/components/front/music-list/list.vue";

export default {
  name: "Detail",
  components: {
    Navbar,
    Player,
    MusicList
  },

  head() {
    return {
      title: this.musicDetail ? this.musicTitle : 'Title...',
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.musicDetail ? this.musicTitle : 'Title...'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.musicDetail ? this.musicDescription : 'Description...'
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: process.env.siteName
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.$route.fullPath
        },
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.meta.og_image
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: 1200
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: 630
        },
      ],
    }
  },

  data() {
    return {
      isPlaying: false,
      musicDetail: null,
      title: "Oxşar nəticələr",
      meta: {
        'title': "Merhaba burasi slug title",
        'description': "Musiqi axtarışında yenilik: Azərbaycan, Türk və dünya musiqisindən ən son hitlər pulsuz axtar və rahat yüklə.",
        'og_image': `${process.env.baseUrl}/assets/images/website_og_image.png`,
      }
    }
  },

  computed: {
    musicTitle() {
      return this.$cleanString(this.musicDetail.title)
    },
    musicDescription() {
      return this.$cleanString(this.musicDetail.description)
    }
  },

  methods: {
    playPause(musicId, musicThumbnail) {
      this.isPlaying = !this.isPlaying
      this.$store.commit('player/set', {
        musicId: musicId,
        musicThumbnail: musicThumbnail,
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

    saveMp3ToDb(musicId, musicName, downloadUrl) {
      return this.$store.dispatch('musicStore/saveMusicToDb', {
        music_id: musicId,
        music_name: musicName,
        music_url: downloadUrl
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

    setBtnStatus(playerData) {
      if (this.musicDetail.videoId === playerData.musicId) {
        this.isPlaying = !!playerData.status;
      }
    },
    setAllBtnStatus(musicId) {
      if (this.musicDetail.videoId !== musicId) {
        this.isPlaying = false
      }
    },
  },

  async asyncData({store, params, error}) {
    try {
      const musicDetail = await store.dispatch('musicStore/getMusicDetail', params.slug);
      if (!musicDetail) {
        return error({statusCode: 404, message: 'Music detail not found'});
      }
      await store.dispatch('musicStore/getSimilarMusics', musicDetail.similarQuery);
      return {musicDetail};
    } catch (err) {
      return error({statusCode: 404, message: 'Error fetching music detail'});
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

<style scoped>

.page-content {
  margin-top: 15px;
}

.item-desc {
  max-height: 105px;
  overflow-y: auto;
  padding: 10px;
  margin: 0 auto !important;
  font-size: 14px;
  background: #f6f7ce;
  border-radius: 5px;
  border: 1px solid #b8a884;
  white-space: pre-wrap;
}

@media screen and (max-width: 543px) {
  .item-action {
    text-align: center;
  }

  .item-desc {
    max-height: 300px;
  }
}


.page-title {
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-family: revert;
}


.fa-play, .fa-pause, .fa-circle-down {
  font-size: 15px !important;
}

.action-position {
  margin-top: 15px;
}

.similar-list {
  margin-top: 50px;
}

.music-title {
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-family: revert;
  margin-bottom: 15px;
}

.media-image {
  background-size: contain !important;
}

</style>
