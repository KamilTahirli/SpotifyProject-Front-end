<template>
  <main class="main">
    <div class="container-fluid">
      <ArtistList/>
      <CategoryList/>
      <MusicList
          :list-title="title"
          :list-key="key"
      />
    </div>
  </main>
</template>
<script>
import Player from "@/components/front/player.vue";
import SearchBox from "@/components/front/search_box.vue";
import MusicList from '~/components/front/music-list/list.vue'
import ArtistList from '~/components/front/artists/list.vue'
import CategoryList from '~/components/front/categories/list.vue'

export default {
  name: 'IndexPage',
  // middleware: 'controlAuth',
  components: {
    Player,
    SearchBox,
    MusicList,
    ArtistList,
    CategoryList,
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
      title: "Trend",
      key: "trend",
      meta: {
        'title': "Ən Yeni Hit MP3-ləri Axtar və Dinlə – Hər Zövqə Uyğun Musiqilər!",
        'description': "Musiqi axtarışında yenilik: Azərbaycan, Türk və dünya musiqisindən ən son hitlər pulsuz axtar və rahat yüklə.",
        'og_image': `${process.env.baseUrl}/assets/images/website_og_image.png`,
      }
    }
  },

  async asyncData({store}) {
    await store.dispatch('musicStore/getTrendMusicsForYt');
  }
}
</script>