<template>
  <b-container class="range-slider-container">
    <b-row>
      <b-col>
        <b-card no-body>
          <b-card-header class="d-flex justify-content-between">
            <span class="facet-name">{{ label }}</span>
            <b-button v-if="selected[0] > min || selected[1] < max" pill variant="info" size="sm" @click="clearFilter">Clear</b-button>
          </b-card-header>

          <b-card-body>
            <b-form-group>
              <vue-slider v-model="selected" :min="min" :max="max" :enable-cross="false" :tooltip="'always'"></vue-slider>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import { debounce } from "lodash";

export default {
  props: { min: Number, max: Number, label: String, name: String },
  components: {
    VueSlider,
  },
  data: function () {
    return {
      selected: [this.min, this.max],
    };
  },
  watch: {
    selected: debounce(function (val) {
      this.$store.dispatch("updateFilter", { filterName: this.name, filterOptions: val });
      this.$store.dispatch("filterResults");
    }, 500),
  },
  methods: {
    clearFilter() {
      this.selected = [this.min, this.max];
    },
  },
};
</script>

<style scoped>
.facet-name {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
