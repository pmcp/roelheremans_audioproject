<template>
  <div id="project">
    <div v-for="p in projects" class="pa3 pb0">
      <a @click="$emit('setActiveProject', p)" >{{p.name}}</a>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
// import rhTracks from "../components/rh-tracks";

const series = db.collection('roel_series')

export default {
  name: "Projects",
  components: {  },
  props: ['activeSeries'],
    data() {
    return {
      projects: null
    };
  },
  methods: {
    setActiveProject(id) {
      this.activeSeries = id;
    }
  },
  watch: {
    activeSeries: {
      immediate: true,
      handler(activeSeries) {
        this.$bind('projects', series.doc(activeSeries).collection('projects'))
        // this.$bind('projects', projects.doc(id).collection('tracks'))
      },
    },
  },
};
</script>