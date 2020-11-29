<template>
  <div class="sidebar-container">
    <div class="row">
      <RangeSlider v-if="valueRange" :min="valueRange[0]" :max="valueRange[1]" :name="'Value'" :label="'Value'" />
      <RangeSlider v-if="floorAreaRange" :min="floorAreaRange[0]" :max="floorAreaRange[1]" :name="'Floor Area'" :label="'Floor Area'" />
      <RangeSlider v-if="siteAreaRange" :min="siteAreaRange[0]" :max="siteAreaRange[1]" :name="'Site Area'" :label="'Site Area'" />
      <RangeSlider v-if="storeyRange" :min="storeyRange[0]" :max="storeyRange[1]" :name="'Storeys'" :label="'Storeys'" />
      <RangeSlider v-if="unitRange" :min="unitRange[0]" :max="unitRange[1]" :name="'Units'" :label="'Units'" />
      <Multiselect v-if="categories" :label="'Categories'" :options="categories" :name="'Category'" />
      <Multiselect v-if="stages" :label="'Stages'" :options="stages" :name="'Stage'" />
      <Multiselect v-if="ownerships" :label="'Ownerships'" :options="ownerships" :name="'Ownership'" />
      <Multiselect v-if="devTypes" :label="'Development Types'" :options="devTypes" :name="'Dev. Type'" />
      <Multiselect v-if="councils" :label="'Councils'" :options="councils" :name="'Council'" />
    </div>
  </div>
</template>

<script>
import Multiselect from "./filters/Multiselect";
import RangeSlider from "./filters/RangeSlider";
import { mapState } from "vuex";

export default {
  components: {
    Multiselect,
    RangeSlider,
  },
  computed: {
    ...mapState(["facets"]),
  },
  data() {
    return {
      categories: null,
      stages: null,
      ownerships: null,
      devTypes: null,
      councils: null,
      valueRange: null,
      floorAreaRange: null,
      siteAreaRange: null,
      storeyRange: null,
      unitRange: null,
    };
  },
  mounted() {
    this.$store.dispatch("initFacets");
    this.categories = this.facets.categories;
    this.stages = this.facets.stages;
    this.ownerships = this.facets.ownerships;
    this.devTypes = this.facets.devTypes;
    this.councils = this.facets.councils;
    this.valueRange = this.facets.valueRange;
    this.floorAreaRange = this.facets.floorAreaRange;
    this.siteAreaRange = this.facets.siteAreaRange;
    this.storeyRange = this.facets.storeyRange;
    this.unitRange = this.facets.unitRange;
  },
};
</script>
