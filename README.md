# kosmos

An Isomorphic, Real-time Redux App Framework with Offline Support

## How to use

Install it:

```
$ yarn add kosmos
```

Add an npm script:

```json
{
  "scripts": {
    "dev": "kosmos"
  }
}
```

## Project Structure

- src
  - assets
    - img
    - fonts
  - app
    - home
      - index.js
      - index.test.js
      - action-types.js
      - actions.js
      - reducer.js
      - reducer.test.js
      - selectors.js
      - styles.js
    - common
      - components
        - nav
          - index.js
          - index.test.js
          - styles.js
    - index.js