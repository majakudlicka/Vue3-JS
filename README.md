# VMail: Vue3-Playground

The aim of this project is to test out different setups of Vue3 (Js, Typescript, vite / webpack, Vuetify...) on
a basic "vmail" mailbox app. The app has two views - Inbox and Archived - that the user can switch between. User can move 
emails from one view to another, mark them as read/unread as well as select a particular email to be displayed. App
also supports basic keyboard shortcuts.

App uses static server to serve the emails.

Different branches represent different setups:

- `javascript`(default branch):  Vue3 + Javascript + Webpack
- `typescript`: Vue3 + Typescript + Webpack
- `typescript+vuetify`: Vue3 + Typescript + Vuetify + Vue Router + Vuex + Webpack
- `typescript+vuetify+vite`: Vue3 + Typescript + Vuetify + Vue Router + Vuex + Vite

## Project setup
```
npm install
```

### Run locally

#### Start static server
```
npm run server
```

#### Run project
```
npm run serve
```

### Build for production
```
npm run build
```

### Lint
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
