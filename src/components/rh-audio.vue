<template>
  <div class="pa3 pb0 flex">
    <a 
      @click="toggleStatus()"
      class="position:relative;z-index:5;"
      :class="{ 'o-20': !checked }"
    >
      {{ name }}
    </a>
    <div style="opacity:1;height:0">
      
      <vue-plyr ref="plyrAudio">
        <audio
          crossorigin
          playsinline
        >
          <source
            :src="src"
            type="audio/mp3"
          >
        </audio>
      </vue-plyr>
    </div>
  </div>
</template>

<script>
export default {
  name: "rh-audio",
  data() {
    return {
      checked: true,
      loading: true,
      checked: true
    };
  },
  props: ["time", "status", "src", "name"],

  methods: {
    toggleStatus() {
      this.checked = !this.checked;
      if (this.checked === true) {
        this.$emit("getTime");
        
      } else {
        this.plyrAudio.stop();
      }
    }
  },
  mounted() {
    this.plyrAudio.on("canplay", () => {
      this.loading = false;
    });
  },
  computed: {
    plyrAudio() {
      return this.$refs.plyrAudio.player;
    }
  },
  watch: {
    status: function(newVal, oldVal) {
      if (newVal === 0) {
        // the video has stopped, stop this audio also
        this.plyrAudio.stop();
      }
      if (newVal === 1 && this.checked === true) {
        // this.plyrAudio.currentTime = this.time;
        // the video has started playing, start this audio, if the toggle is selected and from the duration that the video is
        this.plyrAudio.play();
      }
    },
    time: function(newVal, oldVal) {
      this.time = newVal;
      this.plyrAudio.currentTime = newVal;
      if (this.checked === true) {
        this.plyrAudio.play();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
