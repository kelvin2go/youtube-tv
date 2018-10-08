<template>
  <v-layout column justify-center align-center class="fullscreen" @mouseover="mouseOver" @mouseleave="mouseLeave">
    <v-navigation-drawer 
      :clipped="clipped"
      app
      class="toolbar"
      :value="drawer"
      width="330"
      >
      <YoutubeList :tv-list="allList.items" @changeChannel="changeChannel" />
    </v-navigation-drawer>
    <v-toolbar absolute class="menuBar" v-show="drawer || hover ">
      <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
      <v-flex xs12 sm6 md3 white--text>
        <v-text-field
          label="Watch youtube playlist"
          placeholder="playlist ID"
          v-model="inputVID"
          append-icon="search"
          @click:append="redirectVID(inputVID)"
        ></v-text-field>
      </v-flex>
    </v-toolbar>
    <v-flex xs-12>
      <div class="videoContainer">
        <youtube width="100%" height="100%" :video-id="currentVideo.id" :player-vars="playerVars" @playing="playing"></youtube>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import YoutubeList from '@/components/tvList.vue'

export default {
  layout: 'tv',
  components: {
    YoutubeList
  },
  props: ['defaultList'],
  async asyncData ({ params, app }) {
    const playlistId = params.id || 'PLxY9LoSnhGg3JTPFNOaPxuFzN95Q2DscP'
    console.log("***")
    console.log(playlistId)
    let { data } = await app.$axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId,
          maxResults: 50,
          key: process.env.YOUTUBE_KEY
        },
        useCache: true 
      })
      console.log(data)
      if (data && data.items.length > 0) {
        return { 
          tvList: data
        }
      }
      else return { tvList: data }
  },
  data() {
    return {
      clipped: false,
      hover: false,
      videoId: 'u5X_hiHtKkM',
      inputVID: '',
      currentIndex: 0,
      playerVars: {
        autoplay: 1
      },
      tvList: {
        items: {}
      }
    }
  },
  computed: {
    allList: function() {
      return this.tvList.items.length > 0 ? this.tvList : this.defaultList
    },
    drawer: {
      get: function () {
        return this.$store.state.sidebar 
      },
      set: function (val) {
        this.$store.commit('toggleSidebar')
      }
    },
    currentVideo: function () {
      if ( this.tvList.items.length > 0 ) {
        return {
          id: this.tvList.items[this.currentIndex].snippet.resourceId.videoId
        }
      } 
      return {
        id: 'u5X_hiHtKkM',
        index: 0,
      }
    }
  },
  methods: {
    redirectVID (playlistId) {
      console.log("***!!!" + playlistId)
      // this.$router.push({path: "/"+playlistId, query: {id: playlistId}});
      window.location.href = `${location.protocol}//${window.location.hostname}:${location.port}/${playlistId}`
    },
    changeChannel (index) {
      // this.videoId = id
      this.currentIndex = index
    },
    mouseOver () {
      this.hover = true
      this.$store.commit('openSidebar')
    },
    mouseLeave () {
      this.hover = false
      if (!this.clipped) { 
        this.$store.commit('closeSidebar')
      }
    },
    toggleDrawer () {
      this.clipped = !this.clipped
      this.$store.commit('openSidebar')
    },
    playing() {
      console.log('\o/ we are watching!!!')
    }
  }
}
</script>

<style lang="stylus">
.fullscreen
  .menuBar
    color: rgba(0, 0, 0, 0.7)
    // display: none
  .toolbar
    z-index: 3000
    // display: none
  .v-navigation-drawer
    z-index: 4000

.fullscreen:hover
  .menuBar
    display: block
  .toolbar
    display: block

.videoContainer
  position: absolute
  width: 100%
  height: 100%
  top: 0
  left: 0
  bottom: 0
  right: 0
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

</style>