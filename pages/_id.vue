<template>
  <v-content>
    <v-toolbar-side-icon
      style="z-index: 9000 ;display: block; color: #ff0001; height: 100%;position:absolute; top: 8px; left: 0px;"
      @click.native="toggleDrawer"
    ></v-toolbar-side-icon>
    <div
      @mouseover="mouseOver"
      @click.native="hover = true"
      style="z-index: 99999;display: block;height: 99%;"
    >
      <v-toolbar
        absolute
        class="menuBar"
        v-show="drawer || hover"
      >
        <v-toolbar-side-icon
          style="color: #ff0001"
          @click.native="toggleDrawer"
        ></v-toolbar-side-icon>

        <v-flex
          xs12
          sm6
          md3
          white--text
          :label="currentIndex"
        >
          <v-text-field
            label="Watch youtube playlist"
            placeholder="playlist ID"
            v-model="inputVID"
            append-icon="search"
            @click:append="redirectVID(inputVID)"
          ></v-text-field>
        </v-flex>
      </v-toolbar>

      <v-navigation-drawer
        id="app-drawer"
        v-model="drawer"
        app
        floating
        presistent
        mobile-break-point="991"
        class="toolbar"
        width="330"
      >
        <YoutubeList
          v-if="allList.items.length > 0"
          :tv-list="allList.items"
          @changeChannel="changeChannel"
        />
      </v-navigation-drawer>

      <v-layout class="fullscreen">
        <v-flex xs-12>
          <div class="videoContainer">
            <youtube
              width="100%"
              height="100%"
              :video-id="currentVideo.id"
              :player-vars="playerVars"
              @playing="playing"
              @ended="currentIndex++"
            ></youtube>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-content>
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
    console.log('***')
    console.log(playlistId)
    try {
      let { data } = await app.$axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          part: 'snippet',
          playlistId,
          maxResults: 50,
          key: process.env.YOUTUBE_KEY
        },
        useCache: true
      })
      console.log(data && data.items[0].snippet)
      if (data && data.items && data.items.length > 0) {
        return {
          tvList: data
        }
      } else return { tvList: data }
    } catch (err) {
      console.log(err)
    }
  },
  data () {
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
    allList: function () {
      return this.tvList.items.length > 0 ? this.tvList : this.defaultList
    },
    drawer: {
      get: function () {
        return this.$store.state.sidebar
      },
      set: function (val, old) {
        console.log(val)
        console.log(old)
        this.$store.commit('setSidebar', val)
      }
    },
    currentVideo: function () {
      if (this.allList.items.length > 0) {
        return {
          id: this.allList.items[this.currentIndex].snippet.resourceId.videoId
        }
      }
      return {
        id: 'u5X_hiHtKkM',
        index: 0
      }
    }
  },
  methods: {
    redirectVID (playlistId) {
      console.log('***!!!' + playlistId)
      // this.$router.push({path: "/"+playlistId, query: {id: playlistId}});
      let HOST_BASE = `${location.protocol}//${window.location.hostname}:${location.port}/`
      if (window.location.hostname === 'kelvinho.js.org') {
        HOST_BASE += 'playground/tv/'
      }
      console.log(HOST_BASE)
      window.location.href = `${HOST_BASE}${playlistId}`
    },
    changeChannel (index) {
      // this.videoId = id
      this.currentIndex = index
    },
    mouseOver () {
      this.hover = true
      // this.$store.commit('openSidebar')
    },
    mouseLeave () {
      this.hover = false
      // if (!this.clipped) {
      //   this.$store.commit('closeSidebar')
      // }
    },
    toggleDrawer () {
      // this.clipped = !this.clipped'
      console.log(this.$store.state.drawer)
      this.$store.commit('setSidebar', !this.$store.state.sidebar)
    },
    playing () {
      console.log('\o/ we are watching!!!')
    }
  }
}
</script>

<style lang="stylus">
.fullscreen {
  .menuBar {
    color: rgba(0, 0, 0, 0.7);
    // display: none
  }

  .toolbar {
    z-index: 6000;
    // display: none
  }

  .v-navigation-drawer {
    z-index: 4000;
  }
}

// .fullscreen:hover
// .menuBar
// display: block
// .toolbar
// display: block
.videoContainer {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.v-content {
  padding: 0px;
}
</style>