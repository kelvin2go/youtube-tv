<template>
  <tv :defaultList="tvList"></tv>
</template>

<script>
import tv from './_id.vue'

export default {
  layout: 'tv',
  components: {
    tv
  },
  async asyncData ({ params, app }) {
    const playlistId = params.id || 'PLxY9LoSnhGg3JTPFNOaPxuFzN95Q2DscP'
    console.log('***')
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
    if (data && data.items && data.items.length > 0) {
      return {
        tvList: data
      }
    } else return { tvList: data }
  }
}
</script>