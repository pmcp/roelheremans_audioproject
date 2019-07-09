<template>
  <div id="tracks">
    <div v-for="t in tracks">
      <rh-audio :src="t.url"
      :name="t.name"
        :time="videoTime"
        :status="videoStatus"
        @getTime="getTime"
      ></rh-audio>

    </div>
  </div>
</template>

<script>

import { db } from '@/firebase'
import rhAudio from "../components/rh-audio";

const series = db.collection('roel_series')

export default {
  name: "Projects",
  components: { rhAudio },
  props: ['activeProject', 'activeSeries', 'videoStatus', 'videoTime'],
    data() {
    return {
      tracks: null
    };
  },
  methods: {
    setActiveTrack(id) {
      this.activeTrack = id;
    },
    getTime() {
      console.log('test');
      this.$emit('getTime');
    }

  },
  watch: {
    activeSeries: {
      immediate: true,
      handler(activeProject) {
        this.$bind('tracks', series.doc(this.activeSeries).collection('projects').doc(this.activeProject).collection('tracks'))      },
    },
     time: function(newVal, oldVal) {
       this.videoTime = newVal;
    }
  },
};
</script>