<template>
  <v-layout row>
    
    <v-flex xs12 v-if="tvList.length > 0" >
      <div class="display-2"> 
        TV list {{tvList.length}} channels
      </div>
      <v-card class="tv-card" v-for="(item, index) in tvList" :key="`tv_${item.id}`" >
       
        <v-img v-if="item.snippet && item.snippet.thumbnails.medium"
          :src="item.snippet.thumbnails.medium.url"
          height="180px"
          width="320px"
          @click="changeChannel(index)"
        >
          <v-layout
            column
            fill-height
          >
            <v-btn class="tv-title" icon disabled>
              {{index + 1}}
            </v-btn>
            <v-spacer></v-spacer>
            <div class="tv-title"> {{item.snippet.title}}</div>
          </v-layout>
        </v-img>
      </v-card>
    </v-flex>
    <v-flex xs12 v-else > 
      No channels
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {
  },
  props: ['tvList'],
  methods: {
    changeChannel (id) {
      console.log(id)
      this.$emit('changeChannel', id)
    }
  }
}
</script>

<style>
  .tv-title {
    overflow: hidden;
    background-color: rgba(119, 119, 119, .9);
    height: 32px;
    font-size: 23px;
    font-weight: 500;
    padding: 0px 7px;
  }
  .tv-card {
    padding-bottom: 10px;
  }
</style>