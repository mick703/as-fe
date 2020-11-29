<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapState } from "vuex";

export default {
  mounted() {
    this.initMap();
  },

  data() {
    return {
      map: null,
      markers: [],
    };
  },
  computed: {
    ...mapState(["currentFeatures"]),
  },
  watch: {
    currentFeatures: {
      handler() {
        if (this.currentFeatures) {
          this.resetMarkers();
          this.updateMarkers();
        }
      },
      deep: true,
    },
  },
  methods: {
    resetMarkers() {
      this.markers.forEach((marker) => {
        marker.remove();
      });
      this.markers = [];
    },
    updateMarkers() {
      this.markers = this.currentFeatures.features.map((feature) => {
        const el = document.createElement("div");
        el.className = "marker";

        // create the popup
        const popup = this.featurePopup(feature);
        return new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).setPopup(popup).addTo(this.map);
      });
    },

    initMap() {
      mapboxgl.accessToken = "pk.eyJ1IjoibWluZ3lhbjIxNCIsImEiOiJja2h4Y2xiajAwMTBsMnZuNHBzMjVmYjlsIn0.w7Wxvvi2i4olHVL2gE1zkQ";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [this.currentFeatures.features[0].geometry.coordinates[0], this.currentFeatures.features[0].geometry.coordinates[1]],
        zoom: 15,
        // zoom: -5,
      });
      this.map.on("load", () => {
        this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
        this.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          "top-right"
        );
        this.map.addControl(
          new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: "metric",
          })
        );

        if (this.markers.length > 0) {
          this.resetMarkers();
        }

        if (this.currentFeatures) {
          this.updateMarkers();
        }
      });
    },

    featurePopup(feature) {
      return new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="card">
          <div class="card-body">
            <p class='feature-title font-weight-bold'>${feature.properties.project.Title}</p>

              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <span class='label'>Value($):</span>${parseInt(feature.properties.project.Value)} K
                </li>
                <li class="list-group-item">
                  <span class='label'>Address:</span>${feature.properties.project.Address}
                </li>
                <li class="list-group-item">
                  <span class='label'>Suburb:</span>${feature.properties.project.Suburb}
                </li>
                <li class="list-group-item">
                  <span class='label'>Floor Area(m2):</span>${parseInt(feature.properties.project["Floor Area"])}
                </li>
                <li class="list-group-item">
                  <span class='label'>Site Area(m2):</span>${parseInt(feature.properties.project["Site Area"])}
                </li>
                <li class="list-group-item">
                  <span class='label'>Stories:</span>${parseInt(feature.properties.project.Storeys)}
                </li>
                <li class="list-group-item">
                  <span class='label'>Units:</span>${parseInt(feature.properties.project.Units)}
                </li>
                <li class="list-group-item">
                  <span class='label'>Stage:</span>${feature.properties.project.Stage}
                </li>
                <li class="list-group-item">
                  <span class='label'>Category:</span>${feature.properties.project.Category}
                </li>
                <li class="list-group-item">
                  <span class='label'>Sub-category:</span>${feature.properties.project.SubCategory}
                </li>
                <li class="list-group-item">
                  <span class='label'>Category:</span>${feature.properties.project.Category}
                </li>
              </ul>
          </div>
        </div>
        `);
    },
  },
};
</script>

<style>
.map-container {
  position: relative;
  width: 100%;
  height: 95vh;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.marker:before {
  content: "";
  cursor: pointer;
  position: absolute;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 75% 45% 75% 0%;
  background: #3498db;
  bottom: 0;
  transform-origin: 0% 100%;
  transform: rotate(-45deg) scale(1);
}

.mapboxgl-popup-content .list-group-item {
  padding: 0.5rem 0.25rem;
}
.mapboxgl-popup-content .list-group-item .label {
  padding-right: 0.5rem;
  font-weight: bold;
}
</style>
