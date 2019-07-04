<template>
  <div id="app">
    <rh-audio v-for="(item, index) in audio"
      :key="index"
      :src="item.url"
      :time="videoTime"
      :status="videoStatus"
      @setTime="getCurrentTime"
    ></rh-audio>

    <vue-plyr ref="plyrVideo">
     <div class="plyr__video-embed">
    <iframe
      :src="videoSrc"
      allowfullscreen allowtransparency allow="autoplay">
    </iframe>
  </div>
    </vue-plyr>

  </div>
</template>

<script>
import rhAudio from "./components/rh-audio";

export default {
  name: "app",
  components: { rhAudio },
  data() {
    return {
      videoTime: 0,
      videoStatus: 0,
      videoSrc: 'https://www.youtube.com/embed/wcIy-V4WTVU?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1',
      audio: [
        {'url': './blue_quartet_a_online_visioneren.mp3'},
        {'url': './yellow_quartet_a_online_visioneren.mp3'},
        {'url': './red_quartet_a_online_visioneren.mp3'},
        {'url': './yellow_quartet_a_online_visioneren.mp3'},
      ]
    };
  },
  methods: {
    getCurrentTime() {
      console.log('test')
      this.videoTime = this.plyrVideo.currentTime;
    }
  },
  mounted() {
    this.plyrVideo.on("play", () => {
      this.videoStatus = 1;
      this.getCurrentTime();
    });
    this.plyrVideo.on("playing", () => {
      this.getCurrentTime();

    });
    this.plyrVideo.on("stop", () => {
      this.videoStatus = 0;
    });
    this.plyrVideo.on("pause", () => {
      this.videoStatus = 0;
    });
    this.plyrVideo.on("seeking", () => (this.videoStatus = 2));
  },
  computed: {
    plyrVideo() {
      return this.$refs.plyrVideo.player;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
