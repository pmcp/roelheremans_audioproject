<template>
  <div id="video">
    VIDEO SRC: {{ src }}
    <vue-plyr  ref="plyrVideo" hideYouTubeDOMError>
      <div class="plyr__video-embed">
        <iframe
          :src="src"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        >
        </iframe>
      </div>
    </vue-plyr>
  </div>
</template>

<script>

export default {
  name: "Video",
  props: ['src'],
    data() {
    return {

    };
  },
  methods: {

  },
  mounted() {
    this.plyrVideo.on("play", () => {
      this.$emit('setVideoStatus', 1)
      this.$emit('setCurrentTime', this.plyrVideo.currentTime)
    });
    this.plyrVideo.on("playing", () => {
      this.$emit('setCurrentTime', this.plyrVideo.currentTime)
    });
    this.plyrVideo.on("stop", () => {
      this.$emit('setVideoStatus', 0)
    });
    this.plyrVideo.on("pause", () => {
      this.$emit('setVideoStatus', 0)
    });
    this.plyrVideo.on("seeking", () => {
      this.$emit('setVideoStatus', 2)
    });
  },
  computed: {
    plyrVideo() {
      return this.$refs.plyrVideo.player;
    }
  },
 watch: {

    src: function (newSrc, oldSrc) {
      
      this.plyrVideo.source = {
    type: 'video',
    sources: [
        {
            src: newSrc,
            provider: 'youtube',
        },
    ],
};
      
      
    }
  },
};
</script>