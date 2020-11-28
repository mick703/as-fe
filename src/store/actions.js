export default {
  initFacets({ commit, state }) {
    console.log('init facets')

    const categories = new Set()
    const stages = new Set()
    const councils = new Set()
    const states = new Set()
    const ownerships = new Set()
    const devTypes = new Set()

    state.fullFeatures.features.forEach(feature => {
      categories.add(feature.properties.project.Category)
      stages.add(feature.properties.project.Stage)
      councils.add(feature.properties.project.Council)
      states.add(feature.properties.project.State)
      ownerships.add(feature.properties.project.Ownership)
      devTypes.add(feature.properties.project['Dev. Type'])
    });

    const facets = {
      categories,
      stages,
      councils,
      states,
      ownerships,
      devTypes
    }

    console.log(facets)

    commit('setFacets', facets)
  },

  filterResults({ commit, state }) {

    const filteredFeatures = state.fullFeatures.features.filter(feature => {

      const filters = state.filters
      // let isToBeReturned = true
      const facetNames = Object.keys(filters)
      for (const facetName of facetNames) {

        if ((filters[facetName].length > 0) && (filters[facetName].includes(feature.properties.project[facetName]) === false)) {
          return false
        }
      }

      console.log(feature.properties.project['Category'])
      return true

      // const facetOptions = payload.facetOptions
      // switch (facetName) {
      //   case 'categories':
      //     return facetOptions.includes(feature.project[facetName])
      //   default:
      //     console.error('INVALID FACET')
      // }
    })
    console.log(filteredFeatures)
    commit('setCurrentFeatures', filteredFeatures)

  },

  registerFilter({ commit, state }, payload) {
    commit('setFilters', { ...state.filters, [payload.newFilterName]: [] })

  },

  updateFilter({ commit, state }, payload) {
    const filterName = payload.filterName
    const filterOptions = payload.filterOptions
    commit('setFilters', { ...state.filters, [filterName]: filterOptions })
  }


}