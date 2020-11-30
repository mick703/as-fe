
export default {
  initFacets({ commit, state }) {
    const categories = new Set()
    const stages = new Set()
    const councils = new Set()
    const states = new Set()
    const ownerships = new Set()
    const devTypes = new Set()
    let valueRange = []
    let floorAreaRange = []
    let siteAreaRange = []
    let storeyRange = []
    let unitRange = []

    state.fullFeatures.features.forEach(feature => {
      categories.add(feature.properties.project.Category)
      stages.add(feature.properties.project.Stage)
      councils.add(feature.properties.project.Council)
      states.add(feature.properties.project.State)
      ownerships.add(feature.properties.project.Ownership)
      devTypes.add(feature.properties.project['Dev. Type'])
      valueRange.push(Number(feature.properties.project.Value))
      floorAreaRange.push(Number(feature.properties.project['Floor Area']))
      siteAreaRange.push(Number(feature.properties.project['Site Area']))
      storeyRange.push(Number(feature.properties.project['Storeys']))
      unitRange.push(Number(feature.properties.project['Units']))
    })

    const sortFn = (a, b) => (a - b)
    valueRange = valueRange.sort(sortFn)
    floorAreaRange = floorAreaRange.sort(sortFn)
    siteAreaRange = siteAreaRange.sort(sortFn)
    storeyRange = storeyRange.sort(sortFn)
    unitRange = unitRange.sort(sortFn)


    const facets = {
      categories,
      stages,
      councils,
      states,
      ownerships,
      devTypes,
      valueRange: [valueRange[0], valueRange[valueRange.length - 1]], //[min, max]
      floorAreaRange: [floorAreaRange[0], floorAreaRange[floorAreaRange.length - 1]],
      siteAreaRange: [siteAreaRange[0], siteAreaRange[siteAreaRange.length - 1]],
      storeyRange: [storeyRange[0], storeyRange[storeyRange.length - 1]],
      unitRange: [unitRange[0], unitRange[unitRange.length - 1]],
    }

    commit('setFacets', facets)
  },

  filterResults({ commit, state }) {

    const RANGE_FACET_NAMES = ['Value', 'Floor Area', 'Site Area', 'Storeys', 'Units']
    const filteredFeatures = state.fullFeatures.features.filter(
      feature => {
        const filters = state.filters
        // let isToBeReturned = true
        const facetNames = Object.keys(filters)
        for (const facetName of facetNames) {
          // Handle the range filter
          if (RANGE_FACET_NAMES.includes(facetName)) {
            if ((Number(feature.properties.project[facetName]) <
              filters[facetName][0] ||
              Number(feature.properties.project[facetName]) >
              filters[facetName][1])) {
              return false
            } else {
              continue
            }

          } else {
            if (
              filters[facetName].length > 0 &&
              filters[facetName].includes(
                feature.properties.project[facetName],
              ) === false
            ) {
              return false
            } else {
              continue
            }
          }


        }

        return true
      },
    )

    commit('setCurrentFeatures', filteredFeatures)
  },

  registerFilter({ commit, state }, payload) {
    commit('setFilters', {
      ...state.filters,
      [payload.newFilterName]: [],
    })
  },

  updateFilter({ commit, state }, payload) {
    const filterName = payload.filterName
    const filterOptions = payload.filterOptions
    commit('setFilters', {
      ...state.filters,
      [filterName]: filterOptions,
    })
  },
}
