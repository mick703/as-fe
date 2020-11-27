<template>
  <div class="map-container">
    <h1>Map</h1>
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  props: ["geoData"],
  data() {
    return {
      accessToken: "pk.eyJ1IjoibWluZ3lhbjIxNCIsImEiOiJja2h4Y2xiajAwMTBsMnZuNHBzMjVmYjlsIn0.w7Wxvvi2i4olHVL2gE1zkQ",
      map: null,
    };
  },
  watch: {
    geoData: function (newVal) {
      if (Array.isArray(newVal)) {
        console.log(newVal);
        this.map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: newVal,
          },
        });
        this.map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "text-field": ["get", "project", {}],
            "text-anchor": "top",
          },
        });
      }
    },
  },
  mounted() {
    if (this.geoData) {
      console.log(this.geoData[1]);
      mapboxgl.accessToken = this.accessToken;
      const map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11",
        center: [151.207383, -33.869959], // starting position
        zoom: 13, // starting zoom
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);
      this.map = map;
    }
  },
};
</script>

<style>
#map {
  height: 800px;
  width: 100%;
}
</style>
