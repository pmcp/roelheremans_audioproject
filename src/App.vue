<template>
  <div id="app">

     <vue-plyr
      ref="plyrVideo"
          
      hideYouTubeDOMError
    >
      <div class="plyr__video-embed">
        <iframe
          :src="videoSrc"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        >
        </iframe>
      </div>
    </vue-plyr>


    <div class="flex justify-left w-100">
      <div>
        <div class="pa3 pb0" v-for="s in series" :key="s.id">
          <a @click="setActiveSeries(s.id)">{{s.name}}</a>
      </div>
      </div>
      <div class=" " v-if="activeSeries">
        <rh-projects
          :activeSeries="activeSeries"
          @setActiveProject="setActiveProject"
        />
      </div>
      
        <rh-tracks
          v-if="activeSeries && activeProject"
          :activeSeries="activeSeries"
          :activeProject="activeProject"
          @toggleTrack="toggleTrack"
          :videoStatus="videoStatus"
          :videoTime="videoTime"
          @getTime="getCurrentTime"
        />
      
    </div>
   

  </div>
</template>

<script>
import { db } from "./firebase";
import rhProjects from "./components/rh-projects";
import rhTracks from "./components/rh-tracks";

export default {
  name: "app",
  components: { rhProjects, rhTracks },
  data() {
    return {
      series: [],
      activeSeries: null,
      activeProject: null,
      videoTime: 0,
      videoStatus: 0,
      videoSrc: 'https://www.youtube.com/embed/wcIy-V4WTVU?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1',
      audio: [
        { url: "./blue_quartet_a_online_visioneren.mp3" },
        { url: "./yellow_quartet_a_online_visioneren.mp3" },
        { url: "./red_quartet_a_online_visioneren.mp3" },
        { url: "./yellow_quartet_a_online_visioneren.mp3" }
      ]
    };
  },
  firestore: {
    series: db.collection("roel_series")
  },
  methods: {
    setActiveSeries(id) {
      this.activeSeries = id;
    },
    setActiveProject(project) {
      this.activeProject = project.id;
      this.setVideo(project.videoUrl);
    },
    toggleTrack(id) {
      console.log("toggling track", id);
    },
    setVideo(url) {
      this.videoSrc = url;
      this.plyrVideo.source = {
        type: "video",
        sources: [
          {
            src: url,
            provider: "youtube"
          }
        ]
      };
    },
    getCurrentTime() {
      this.videoTime = this.plyrVideo.currentTime;
    }
  },
  mounted() {
    this.plyrVideo.on("play", () => {
      this.videoStatus = 1;
      this.getCurrentTime();
    });
    this.plyrVideo.on("playing", () => {
      this.videoTime = this.plyrVideo.currentTime;
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