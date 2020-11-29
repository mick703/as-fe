# as-fe

## Demo links
netlify : [https://csb-xjo2w.netlify.app/](https://csb-xjo2w.netlify.app/)
codesandbox : [https://codesandbox.io/s/damp-https-xjo2w](https://codesandbox.io/s/damp-https-xjo2w)

## Known limiations/Todos.
- Need to add tests
- Need to add more filters. Filters are reusable components for a few similar facet filtering.
  - Date range filter to filter relevant dates similar to the multi-select and range filters
  - Auto complated text filter for address matching
- Data file is loaded as part of the project. In a real app, this might come from the API which should be handled in the actions with async functions. 
- Currently not supporting multiple modules in Vuex set up. In a bigger application, this should be broken down further into each module with their own actions, mutations and state files. 
- For some reason, it looks like some css issue, the map navigation control icons are not loading properly.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
