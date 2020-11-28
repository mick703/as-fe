<template>
  <b-container class="sidebar-container">
    <b-row>
      <b-col>
        <b-card no-body>
          <b-card-header class="d-flex justify-content-between">
            <span class="facet-name">{{ label }}</span>
            <b-button v-if="selected.length > 0" pill variant="info" size="sm" @click="clearFilter">Clear</b-button>
          </b-card-header>

          <b-card-body>
            <b-form-group>
              <b-form-checkbox v-for="(option, index) in options" v-model="selected" :key="index" :value="option" :name="name">
                {{ option }}
              </b-form-checkbox>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: { label: String, name: String, options: Set },
  data() {
    return {
      selected: [], // Must be an array reference!
    };
  },

  watch: {
    selected: function (val) {
      this.$store.dispatch("updateFilter", { filterName: this.name, filterOptions: val });
      this.$store.dispatch("filterResults");
    },
  },
  mounted() {
    console.log("filter mounted");
    console.log(this.selected.length);

    this.$store.dispatch("registerFilter", { newFilterName: this.name });
  },
  methods: {
    clearFilter() {
      this.selected = [];
    },
  },
  // watch: {
  //   selected: {
  //     // filterHandler(newVal) {
  //     //   console.log("Selected change.", newVal);
  //     // },
  //   },
  // },
};
</script>

<style scoped>
.facet-name {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
