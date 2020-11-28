<template>
  <div id="project-finder-app">
    <b-container>
      <b-navbar variant="light" type="light" class="navbar d-flex justify-content-between">
        <b-navbar-brand href="#">Project Finder</b-navbar-brand>
        <b-nav-text>
          <h3>
            <b-badge pill variant="info">{{ currentFeatures.features.length }} Projects Found</b-badge>
          </h3></b-nav-text
        >
      </b-navbar>
      <b-row>
        <b-col cols="12" md="4"><Sidebar /></b-col>
        <b-col cols="12" md="8"><Map /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Sidebar,
    Map,
  },

  computed: {
    ...mapState(["currentFeatures"]),
  },
};
</script>

<style scoped>
.navbar {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}
</style>
