export default {
  setFacets: (state, facets) => {
    state.facets = facets
  },
  setCurrentFeatures: (state, features) => {
    state.currentFeatures = { ...state.fullFeatures, features: features }
  },
  setFilters: (state, filters) => {
    state.filters = filters
  }
}