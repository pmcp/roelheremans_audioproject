<template>
  <div>
    <loading-checkbox
      :checked="checked"
      :loading="loading"
      label=""
      @click.native="toggleStatus"
    />
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
</template>

<script>
import LoadingCheckbox from "vue-loading-checkbox";
import "vue-loading-checkbox/dist/LoadingCheckbox.css";

export default {
  name: "rh-audio",
  data() {
    return {
      checked: true,
      loading: true,
      checked: true
    };
  },
  props: ["time", "status", "src"],

  methods: {
    toggleStatus() {
      this.checked = !this.checked;
      if (this.checked === true) {
        this.$emit('setTime')
        this.plyrAudio.currentTime = this.time;
        this.plyrAudio.play();

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
       console.log('time', newVal)
       this.time = newVal;
       this.plyrAudio.currentTime = newVal;
    }
  },
  components: {
    LoadingCheckbox
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
