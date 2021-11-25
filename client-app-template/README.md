### Create _package.json_ file with minimal info

```
{
  "name": "client-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "webpack --config webpack.cofig.js",
    "storybook": "start-atorybook -p 6006 -c .storybook",
    "storybook:build": "build-storybook -c .storybook -o storybook"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```

### Install _Webpack_ dependencies

```
    npm install --save-dev webpack webpack-cli uglifyjs-webpack-plugin clean-webpack-plugin
```

### Install _Storybook_ dependencies

```
    npm install --save-dev @storybook/react @storybook/components @storybook/addon-info storybook-addon-jsx
```

### Install _React_ and _Babel_ depenencies

```
    npm install -save-dev react @babel/core @babel/preset-env @babel/preset-react babel-loader
```

### Create _webpack.config.js_

### Configure _.Sotorybook_

### Configure \_Add-on
