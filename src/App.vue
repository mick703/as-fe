<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col cols="12" md="4"><Sidebar /></b-col>
        <b-col cols="12" md="8"><Map :geoData="features" /></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";

export default {
  name: "App",
  components: {
    Sidebar,
    Map,
  },
  data() {
    return {
      features: [],
    };
  },
  mounted() {
    fetch("https://bitbucket.org/idda/coding-challenges/raw/3d4b01cd8468a83cb173ff30711f637e4d8c3258/testBlob.json")
      .then((response) => response.json())
      .then((data) => {
        this.features = data.features;
      });
  },
};
</script>

<style scoped></style>
