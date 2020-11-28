<template>
  <div class="sidebar-container">
    <div class="row">
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
import { mapState } from "vuex";

export default {
  components: {
    Multiselect,
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
    };
  },
  mounted() {
    this.$store.dispatch("initFacets");
    this.categories = this.facets.categories;
    this.stages = this.facets.stages;
    this.ownerships = this.facets.ownerships;
    this.devTypes = this.facets.devTypes;
    this.councils = this.facets.councils;
  },
};
</script>
