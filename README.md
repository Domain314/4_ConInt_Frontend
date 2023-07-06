# ConInt Todo314-Frontend

## Intro

This is the Frontend part of the CI/CD Project ToDo314 for ConInt, by Chen Lu and Moisejev Artjom.

It uses vue.js as frontend framework and several packages for linting, testing and building, which are commonly used for such projects. The project is focused on CI/CD and ignores some safety must-haves of production ready applications, like password hashing. Do not use it in production! Use on your own behalf. 

## Install

```
npm i
```

## Develop

```
npm run dev
```

## Preview

```
npm run preview
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Build

```
npm run build
```


## Create new Feature Toggles

Create a `config.js` in the `src` folder

```javascript
export default {
    features: {
        sortButton: true
    }
} 
```

Import the config into the component, where you want to use it

```javascript
import config from "../config";
```

Then, use conditional rendering to set the toggle:

```vue
<button type="button" @click="sort" v-if="config.features.sortButton">Sort</button>
```


## Create new A/B Testing

In the component, where you need it, create a new variable and initialize it in the `created` hook:

```javascript
export default {
    /* other code */
    created() {
        this.userGroup = Math.random() < 0.5 ? 'A' : 'B';
    },
}
```

Then, use conditional rendering to display different outcomes:

```vue
<h2 v-if="userGroup === 'A'">Register for A</h2>
<h2 v-else-if="userGroup === 'B'">Register for B</h2>
```

